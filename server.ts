import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { initialUserAccounts } from "./src/data/defaultAccounts";
import {
  INITIAL_PROPERTIES,
  INITIAL_AGENCIES,
  INITIAL_PROVINCE_CITIES,
  CONSORTIUM_DIVISIONS,
  INITIAL_HERO_SLIDES,
  INITIAL_BLOGS,
  INITIAL_SITE_PORTIONS,
} from "./src/data/mockData";
import {
  initialAdvibeProjects,
  initialAdvibeLeads,
} from "./src/data/advibeDemoData";

dotenv.config({ path: ".envRE" });
dotenv.config();

const DATA_DIR = path.resolve(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIR, "portal-state.json");

interface GlobalPortalState {
  properties: any[];
  agencies: any[];
  provinceCityData: any[];
  heroSlides: any[];
  blogs: any[];
  sitePortions: any[];
  consortiumDivisions: any[];
  userAccounts: any[];
  advibeProjects: any[];
  advibeLeads: any[];
  updatedAt: string;
  revision: number;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function mergeAccountsWithDefaultPasswords(savedAccounts?: any[]): any[] {
  const defaultsMap = new Map(initialUserAccounts.map((u) => [u.id, u]));
  const defaultsByUsername = new Map(
    initialUserAccounts.map((u) => [u.username.toLowerCase(), u])
  );

  if (!Array.isArray(savedAccounts) || savedAccounts.length === 0) {
    return initialUserAccounts.map((u) => ({ ...u }));
  }

  const merged = savedAccounts.map((acc) => {
    const def =
      defaultsMap.get(acc.id) ||
      defaultsByUsername.get(String(acc.username || "").toLowerCase());
    return {
      ...def,
      ...acc,
      password:
        acc.password && String(acc.password).trim().length > 0
          ? String(acc.password).trim()
          : def?.password || "admin123",
    };
  });

  for (const defAcc of initialUserAccounts) {
    const exists = merged.some(
      (m) =>
        m.id === defAcc.id ||
        String(m.username || "").toLowerCase() === defAcc.username.toLowerCase()
    );
    if (!exists) {
      merged.push({ ...defAcc });
    }
  }

  return merged;
}

function buildDefaultState(): GlobalPortalState {
  return {
    properties: INITIAL_PROPERTIES,
    agencies: INITIAL_AGENCIES,
    provinceCityData: INITIAL_PROVINCE_CITIES,
    heroSlides: INITIAL_HERO_SLIDES,
    blogs: INITIAL_BLOGS,
    sitePortions: INITIAL_SITE_PORTIONS,
    consortiumDivisions: CONSORTIUM_DIVISIONS,
    userAccounts: mergeAccountsWithDefaultPasswords(initialUserAccounts),
    advibeProjects: initialAdvibeProjects,
    advibeLeads: initialAdvibeLeads,
    updatedAt: new Date().toISOString(),
    revision: 1,
  };
}

function loadGlobalState(): GlobalPortalState {
  const defaults = buildDefaultState();
  try {
    ensureDataDir();
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const hydrated: GlobalPortalState = {
          properties:
            Array.isArray(parsed.properties) && parsed.properties.length > 0
              ? parsed.properties
              : defaults.properties,
          agencies:
            Array.isArray(parsed.agencies) && parsed.agencies.length > 0
              ? parsed.agencies
              : defaults.agencies,
          provinceCityData:
            Array.isArray(parsed.provinceCityData) &&
            parsed.provinceCityData.length > 0
              ? parsed.provinceCityData
              : defaults.provinceCityData,
          heroSlides:
            Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0
              ? parsed.heroSlides
              : defaults.heroSlides,
          blogs:
            Array.isArray(parsed.blogs) && parsed.blogs.length > 0
              ? parsed.blogs
              : defaults.blogs,
          sitePortions:
            Array.isArray(parsed.sitePortions) && parsed.sitePortions.length > 0
              ? parsed.sitePortions
              : defaults.sitePortions,
          consortiumDivisions:
            Array.isArray(parsed.consortiumDivisions) &&
            parsed.consortiumDivisions.length > 0
              ? parsed.consortiumDivisions
              : defaults.consortiumDivisions,
          userAccounts: mergeAccountsWithDefaultPasswords(parsed.userAccounts),
          advibeProjects:
            Array.isArray(parsed.advibeProjects) &&
            parsed.advibeProjects.length > 0
              ? parsed.advibeProjects
              : defaults.advibeProjects,
          advibeLeads: Array.isArray(parsed.advibeLeads)
            ? parsed.advibeLeads
            : defaults.advibeLeads,
          updatedAt: parsed.updatedAt || defaults.updatedAt,
          revision:
            typeof parsed.revision === "number" && parsed.revision > 0
              ? parsed.revision
              : 1,
        };
        return hydrated;
      }
    }
  } catch (err) {
    console.error("Failed to read portal-state.json:", err);
  }
  saveGlobalState(defaults);
  return defaults;
}

function saveGlobalState(state: GlobalPortalState) {
  try {
    ensureDataDir();
    state.updatedAt = new Date().toISOString();
    state.revision =
      (typeof state.revision === "number" ? state.revision : 0) + 1;
    const tempFile = `${STATE_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(state, null, 2), "utf-8");
    fs.renameSync(tempFile, STATE_FILE);
  } catch (err) {
    console.error("Failed to save portal-state.json:", err);
  }
}

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

function sanitizeStateForClient(state: GlobalPortalState): GlobalPortalState {
  const copy: GlobalPortalState = { ...state };
  if (Array.isArray(copy.userAccounts)) {
    copy.userAccounts = mergeAccountsWithDefaultPasswords(copy.userAccounts);
  }
  return copy;
}

const globalPortalState: GlobalPortalState = loadGlobalState();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (req.path.startsWith("/api/")) {
      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Surrogate-Control", "no-store");
    }
    next();
  });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

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
  }, 15000);

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

  app.get("/api/state/version", (_req, res) => {
    res.json({
      updatedAt: globalPortalState.updatedAt || null,
      revision: globalPortalState.revision || 1,
    });
  });

  app.get("/api/state", (_req, res) => {
    res.json(sanitizeStateForClient(globalPortalState));
  });

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
      "consortiumDivisions",
      "userAccounts",
      "advibeProjects",
      "advibeLeads",
    ];

    let changed = false;
    for (const key of allowedKeys) {
      if (Array.isArray(updates[key])) {
        if (key === "userAccounts") {
          const currentAccounts = mergeAccountsWithDefaultPasswords(
            globalPortalState.userAccounts
          );
          const existingById = new Map(
            currentAccounts.map((u: any) => [u.id, u])
          );
          const existingByUsername = new Map(
            currentAccounts.map((u: any) => [
              String(u.username || "").toLowerCase(),
              u,
            ])
          );

          const updatedAccounts = updates.userAccounts.map((incoming: any) => {
            const existing =
              existingById.get(incoming.id) ||
              existingByUsername.get(
                String(incoming.username || "").toLowerCase()
              );
            return {
              ...existing,
              ...incoming,
              password:
                incoming.password &&
                String(incoming.password).trim().length > 0
                  ? String(incoming.password).trim()
                  : existing?.password || "admin123",
            };
          });

          globalPortalState.userAccounts =
            mergeAccountsWithDefaultPasswords(updatedAccounts);
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

  app.post("/api/auth/verify", (req, res) => {
    const { identifier, password } = sanitizeIncomingPayload(req.body || {});
    if (!identifier || !password) {
      return res.status(400).json({
        verified: false,
        error: "Username/email and password are required.",
      });
    }

    const cleanId = String(identifier).trim().toLowerCase();
    const cleanPass = String(password).trim();

    const accounts = mergeAccountsWithDefaultPasswords(
      globalPortalState.userAccounts
    );
    globalPortalState.userAccounts = accounts;

    const matched = accounts.find((acc: any) => {
      const uname = String(acc.username || "").trim().toLowerCase();
      const mail = String(acc.email || "").trim().toLowerCase();
      const storedPass = String(acc.password || "").trim();
      const idMatches =
        uname === cleanId ||
        mail === cleanId ||
        (cleanId === "admin" && acc.role === "admin");
      const passMatches =
        storedPass === cleanPass ||
        storedPass.toLowerCase() === cleanPass.toLowerCase();
      return idMatches && passMatches;
    });

    if (!matched) {
      return res
        .status(401)
        .json({ verified: false, error: "Invalid username or password." });
    }

    return res.json({ verified: true, user: matched });
  });

  app.get("/api/advibe/projects", (_req, res) => {
    const projects = Array.isArray(globalPortalState.advibeProjects)
      ? globalPortalState.advibeProjects
      : [];
    res.json({
      status: "ok",
      count: projects.length,
      projects,
    });
  });

  app.post("/api/advibe/leads", (req, res) => {
    const leadData = sanitizeIncomingPayload(req.body);
    if (!leadData || !leadData.name || !leadData.phone) {
      return res.status(400).json({
        error: "Name and Phone are required for enquiries.",
      });
    }
    const newLead = {
      id: `lead-adv-${Date.now()}`,
      projectId: String(leadData.projectId || ""),
      projectTitle: String(
        leadData.projectTitle || "General Megaproject Inquiry"
      ),
      name: String(leadData.name).slice(0, 120),
      phone: String(leadData.phone).slice(0, 40),
      email: String(leadData.email || "").slice(0, 120),
      preferredUnit: String(
        leadData.preferredUnit || "General Inquiry"
      ).slice(0, 120),
      message: String(leadData.message || "").slice(0, 1500),
      contactPreference: leadData.contactPreference || "whatsapp",
      source: leadData.source || "website_advibe",
      status: "new",
      createdAt: new Date().toISOString().split("T")[0],
    };
    const leads = Array.isArray(globalPortalState.advibeLeads)
      ? globalPortalState.advibeLeads
      : [];
    leads.unshift(newLead);
    globalPortalState.advibeLeads = leads;
    saveGlobalState(globalPortalState);
    broadcastStateUpdate();
    res.status(201).json({ status: "submitted", lead: newLead });
  });

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

  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, systemContext } = sanitizeIncomingPayload(
        req.body || {}
      );
      if (!message || typeof message !== "string") {
        return res
          .status(400)
          .json({ error: "A valid message is required." });
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
