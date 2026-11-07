import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables from .envRE first, then fallback to default .env
dotenv.config({ path: ".envRE" });
dotenv.config();

const DATA_DIR = path.resolve(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIR, "portal-state.json");

interface GlobalPortalState {
  properties?: any[];
  agencies?: any[];
  provinceCityData?: any[];
  heroSlides?: any[];
  blogs?: any[];
  sitePortions?: any[];
  userAccounts?: any[];
  advibeProjects?: any[];
  advibeLeads?: any[];
  updatedAt?: string;
  revision?: number;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadGlobalState(): GlobalPortalState {
  try {
    ensureDataDir();
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to read portal-state.json:", err);
  }
  return {
    updatedAt: new Date().toISOString(),
    revision: 1,
  };
}

function saveGlobalState(state: GlobalPortalState) {
  try {
    ensureDataDir();
    state.updatedAt = new Date().toISOString();
    state.revision = (typeof state.revision === "number" ? state.revision : 0) + 1;
    const tempFile = `${STATE_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(state, null, 2), "utf-8");
    fs.renameSync(tempFile, STATE_FILE);
  } catch (err) {
    console.error("Failed to save portal-state.json:", err);
  }
}

/**
 * Prevent Prototype Pollution & strip dangerous script URLs recursively
 */
function sanitizeIncomingPayload(input: any): any {
  if (Array.isArray(input)) {
    return input.map(sanitizeIncomingPayload);
  }
  if (input !== null && typeof input === "object") {
    const clean: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        continue;
      }
      clean[key] = sanitizeIncomingPayload(value);
    }
    return clean;
  }
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (/^(javascript|vbscript|data:text\/html):/i.test(trimmed)) {
      return "";
    }
  }
  return input;
}

/**
 * Strip sensitive plaintext passwords before sending state to clients
 */
function sanitizeStateForClient(state: GlobalPortalState): GlobalPortalState {
  const copy: GlobalPortalState = { ...state };
  if (Array.isArray(copy.userAccounts)) {
    copy.userAccounts = copy.userAccounts.map((acc: any) => {
      if (!acc || typeof acc !== "object") return acc;
      const { password, ...safeAccount } = acc;
      return safeAccount;
    });
  }
  return copy;
}

const globalPortalState: GlobalPortalState = loadGlobalState();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Security headers & no-cache for API routes
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (req.path.startsWith("/api/")) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
    next();
  });

  // 50MB payload limit to support Base64 images and short MP4/WebM video clips
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // ============================================================================
  // REAL-TIME UNIVERSAL STATE SYNC (SSE + REST)
  // ============================================================================
  const sseClients = new Set<express.Response>();

  function broadcastStateUpdate() {
    const safePayload = JSON.stringify({
      type: "STATE_UPDATED",
      state: sanitizeStateForClient(globalPortalState),
    });
    for (const client of sseClients) {
      try {
        client.write(`data: ${safePayload}\n\n`);
      } catch {
        sseClients.delete(client);
      }
    }
  }

  // Heartbeat every 20s to keep SSE connections alive through proxies
  setInterval(() => {
    const ping = JSON.stringify({
      type: "HEARTBEAT",
      updatedAt: globalPortalState.updatedAt,
      revision: globalPortalState.revision || 1,
    });
    for (const client of sseClients) {
      try {
        client.write(`data: ${ping}\n\n`);
      } catch {
        sseClients.delete(client);
      }
    }
  }, 20000);

  app.get("/api/state/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();

    res.write(
      `data: ${JSON.stringify({
        type: "INITIAL_STATE",
        state: sanitizeStateForClient(globalPortalState),
      })}\n\n`
    );

    sseClients.add(res);
    req.on("close", () => {
      sseClients.delete(res);
    });
  });

  // Lightweight version check endpoint for fast polling fallback
  app.get("/api/state/version", (_req, res) => {
    res.json({
      updatedAt: globalPortalState.updatedAt || null,
      revision: globalPortalState.revision || 1,
    });
  });

  // GET full universal state
  app.get("/api/state", (_req, res) => {
    res.json(sanitizeStateForClient(globalPortalState));
  });

  // PUT partial or full state update — persists to disk & broadcasts to all sessions
  app.put("/api/state", (req, res) => {
    const updates = sanitizeIncomingPayload(req.body);
    if (!updates || typeof updates !== "object") {
      return res.status(400).json({ error: "Invalid state payload" });
    }

    const allowedKeys: (keyof GlobalPortalState)[] = [
      "properties",
      "agencies",
      "provinceCityData",
      "heroSlides",
      "blogs",
      "sitePortions",
      "userAccounts",
      "advibeProjects",
      "advibeLeads",
    ];

    let changed = false;
    for (const key of allowedKeys) {
      if (Array.isArray(updates[key])) {
        if (key === "userAccounts" && Array.isArray(globalPortalState.userAccounts)) {
          // Preserve existing passwords if incoming account objects omitted password
          const existingById = new Map(
            globalPortalState.userAccounts.map((u: any) => [u.id, u])
          );
          globalPortalState.userAccounts = updates.userAccounts.map((incoming: any) => {
            const existing = existingById.get(incoming.id);
            return {
              ...existing,
              ...incoming,
              password: incoming.password || existing?.password || "admin123",
            };
          });
        } else {
          (globalPortalState as any)[key] = updates[key];
        }
        changed = true;
      }
    }

    if (changed) {
      saveGlobalState(globalPortalState);
      broadcastStateUpdate();
    }

    res.json({
      status: "ok",
      updatedAt: globalPortalState.updatedAt,
      revision: globalPortalState.revision,
      state: sanitizeStateForClient(globalPortalState),
    });
  });

  // Server-side authentication verification endpoint
  app.post("/api/auth/verify", (req, res) => {
    const { identifier, password } = sanitizeIncomingPayload(req.body || {});
    if (!identifier || !password) {
      return res.status(400).json({ error: "Username/email and password are required." });
    }

    const cleanId = String(identifier).trim().toLowerCase();
    const cleanPass = String(password).trim();
    const accounts = Array.isArray(globalPortalState.userAccounts)
      ? globalPortalState.userAccounts
      : [];

    const matched = accounts.find(
      (acc: any) =>
        (String(acc.username || "").toLowerCase() === cleanId ||
          String(acc.email || "").toLowerCase() === cleanId) &&
        String(acc.password || "") === cleanPass
    );

    if (!matched) {
      return res.status(401).json({ verified: false, error: "Invalid credentials." });
    }

    const { password: _omitted, ...safeUser } = matched;
    return res.json({ verified: true, user: safeUser });
  });

  // ============================================================================
  // ADVIBE — CINEMATIC MEGAPROJECT SHOWCASE API ROUTES
  // ============================================================================
  const advibeStore: {
    projects: any[];
    leads: any[];
    permittedDealers: Set<string>;
  } = {
    projects: Array.isArray(globalPortalState.advibeProjects)
      ? globalPortalState.advibeProjects
      : [],
    leads: Array.isArray(globalPortalState.advibeLeads)
      ? globalPortalState.advibeLeads
      : [],
    permittedDealers: new Set(["agency-1", "agency-2"]),
  };

  const requireAdvibeAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const role = String(req.headers["x-user-role"] || "").toLowerCase();
    const agencyId = String(req.headers["x-agency-id"] || "");

    if (
      role === "admin" ||
      (role === "agency" && agencyId && advibeStore.permittedDealers.has(agencyId))
    ) {
      return next();
    }
    return res.status(403).json({
      error: "Forbidden: Requires Super Admin or Authorized Dealer privileges for AdVibe.",
    });
  };

  app.get("/api/advibe/projects", (_req, res) => {
    res.json({
      status: "ok",
      count: advibeStore.projects.length,
      projects: advibeStore.projects,
    });
  });

  app.get("/api/advibe/projects/:slug", (req, res) => {
    const project = advibeStore.projects.find(
      (p) => p.slug === req.params.slug || p.id === req.params.slug
    );
    if (!project) {
      return res.status(404).json({ error: "AdVibe Project not found" });
    }
    res.json(project);
  });

  app.post("/api/advibe/projects", requireAdvibeAuth, (req, res) => {
    const projectData = sanitizeIncomingPayload(req.body);
    if (!projectData || !projectData.title) {
      return res.status(400).json({ error: "Project title is required" });
    }

    const existingIdx = advibeStore.projects.findIndex((p) => p.id === projectData.id);
    if (existingIdx >= 0) {
      advibeStore.projects[existingIdx] = {
        ...advibeStore.projects[existingIdx],
        ...projectData,
        updatedAt: new Date().toISOString().split("T")[0],
      };
      globalPortalState.advibeProjects = advibeStore.projects;
      saveGlobalState(globalPortalState);
      broadcastStateUpdate();
      return res.json({ status: "updated", project: advibeStore.projects[existingIdx] });
    } else {
      const newProject = {
        ...projectData,
        id: projectData.id || `adv-proj-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      advibeStore.projects.unshift(newProject);
      globalPortalState.advibeProjects = advibeStore.projects;
      saveGlobalState(globalPortalState);
      broadcastStateUpdate();
      return res.status(201).json({ status: "created", project: newProject });
    }
  });

  app.delete("/api/advibe/projects/:id", requireAdvibeAuth, (req, res) => {
    const { id } = req.params;
    advibeStore.projects = advibeStore.projects.filter((p) => p.id !== id);
    globalPortalState.advibeProjects = advibeStore.projects;
    saveGlobalState(globalPortalState);
    broadcastStateUpdate();
    res.json({ status: "deleted", id });
  });

  app.post("/api/advibe/projects/:id/duplicate", requireAdvibeAuth, (req, res) => {
    const source = advibeStore.projects.find((p) => p.id === req.params.id);
    if (!source) {
      return res.status(404).json({ error: "Source project not found" });
    }
    const duplicate = {
      ...source,
      id: `adv-proj-${Date.now()}`,
      title: `${source.title} (Copy)`,
      slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
      published: false,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    advibeStore.projects.unshift(duplicate);
    globalPortalState.advibeProjects = advibeStore.projects;
    saveGlobalState(globalPortalState);
    broadcastStateUpdate();
    res.status(201).json({ status: "duplicated", project: duplicate });
  });

  app.post("/api/advibe/leads", (req, res) => {
    const leadData = sanitizeIncomingPayload(req.body);
    if (!leadData || !leadData.name || !leadData.phone) {
      return res.status(400).json({ error: "Name and Phone are required for enquiries." });
    }
    const newLead = {
      id: `lead-adv-${Date.now()}`,
      projectId: String(leadData.projectId || ""),
      projectTitle: String(leadData.projectTitle || "General Megaproject Inquiry"),
      name: String(leadData.name).slice(0, 120),
      phone: String(leadData.phone).slice(0, 40),
      email: String(leadData.email || "").slice(0, 120),
      preferredUnit: String(leadData.preferredUnit || "General Inquiry").slice(0, 120),
      message: String(leadData.message || "").slice(0, 1500),
      contactPreference: leadData.contactPreference || "whatsapp",
      source: leadData.source || "website_advibe",
      status: "new",
      createdAt: new Date().toISOString().split("T")[0],
    };
    advibeStore.leads.unshift(newLead);
    globalPortalState.advibeLeads = advibeStore.leads;
    saveGlobalState(globalPortalState);
    broadcastStateUpdate();
    res.status(201).json({ status: "submitted", lead: newLead });
  });

  app.get("/api/advibe/leads", requireAdvibeAuth, (_req, res) => {
    res.json({
      status: "ok",
      count: advibeStore.leads.length,
      leads: advibeStore.leads,
    });
  });

  app.post("/api/advibe/permissions", requireAdvibeAuth, (req, res) => {
    const { agencyId, canPublish } = sanitizeIncomingPayload(req.body || {});
    if (!agencyId) {
      return res.status(400).json({ error: "agencyId is required" });
    }
    if (canPublish) {
      advibeStore.permittedDealers.add(String(agencyId));
    } else {
      advibeStore.permittedDealers.delete(String(agencyId));
    }
    res.json({
      status: "updated",
      agencyId,
      canPublish: advibeStore.permittedDealers.has(String(agencyId)),
    });
  });

  // Health Check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      updatedAt: globalPortalState.updatedAt,
      revision: globalPortalState.revision || 1,
      geminiConfigured:
        !!process.env.GEMINI_API_KEY &&
        process.env.GEMINI_API_KEY !== "your_actual_gemini_api_key_here",
    });
  });

  // Gemini AI Chat Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, systemContext } = sanitizeIncomingPayload(req.body || {});
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "A valid message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "your_actual_gemini_api_key_here") {
        return res.status(503).json({
          error: "GEMINI_API_KEY is not configured in .envRE",
          fallback: true,
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
          systemInstruction:
            systemContext ||
            "You are the official AI Property & Consortium Advisor for ri8click.com, Pakistan's premier real estate portal and consortium based in Taxila, Faisal Hills, and Islamabad.",
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });

      const replyText =
        response.text ||
        "Thank you for reaching out to ri8click. Please contact our executive desk on WhatsApp at +92 336-5666727 for immediate assistance.";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini API error:", error?.message || error);
      return res.status(500).json({
        error: "Failed to generate response from Gemini.",
        fallback: true,
      });
    }
  });

  // Vite middleware for development; static bundle for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
