import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables from .envRE and .env if available
dotenv.config({ path: path.resolve(process.cwd(), ".envRE") });
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security headers middleware
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Increase body limit to 50MB so base64/uploaded images from Admin or Agencies save universally
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_actual_gemini_api_key_here") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}

// ============================================================================
// UNIVERSAL PORTAL STATE PERSISTENCE & REAL-TIME SSE BROADCAST
// ============================================================================
const DATA_DIR = path.resolve(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIR, "portal-state.json");

interface GlobalPortalState {
  properties: any[] | null;
  agencies: any[] | null;
  provinceCityData: any[] | null;
  heroSlides: any[] | null;
  blogs: any[] | null;
  sitePortions: any[] | null;
  userAccounts: any[] | null;
  advibeProjects: any[] | null;
  advibeLeads: any[] | null;
  updatedAt: string;
}

function loadGlobalState(): GlobalPortalState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read global portal state:", err);
  }
  return {
    properties: null,
    agencies: null,
    provinceCityData: null,
    heroSlides: null,
    blogs: null,
    sitePortions: null,
    userAccounts: null,
    advibeProjects: null,
    advibeLeads: null,
    updatedAt: new Date().toISOString()
  };
}

let globalPortalState: GlobalPortalState = loadGlobalState();

function saveGlobalState() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    globalPortalState.updatedAt = new Date().toISOString();
    fs.writeFileSync(STATE_FILE, JSON.stringify(globalPortalState, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist global portal state:", err);
  }
}

// Redact sensitive password fields when broadcasting state to public browser clients
function getPublicSanitizedState(state: GlobalPortalState): GlobalPortalState {
  return {
    ...state,
    userAccounts: Array.isArray(state.userAccounts)
      ? state.userAccounts.map(({ password, ...safeAccount }) => safeAccount)
      : null
  };
}

// Connected SSE clients for instant multi-browser synchronization
const sseClients = new Set<express.Response>();

function broadcastStateUpdate(changedKeys: string[]) {
  const payload = JSON.stringify({
    type: "STATE_UPDATED",
    changedKeys,
    updatedAt: globalPortalState.updatedAt,
    state: getPublicSanitizedState(globalPortalState)
  });
  for (const client of sseClients) {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Subscribe to live state updates via Server-Sent Events (SSE)
app.get("/api/state/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  sseClients.add(res);
  res.write(
    `data: ${JSON.stringify({
      type: "CONNECTED",
      updatedAt: globalPortalState.updatedAt
    })}\n\n`
  );

  req.on("close", () => {
    sseClients.delete(res);
  });
});

// Get universal portal state for all browser sessions (passwords redacted)
app.get("/api/state", (_req, res) => {
  res.json(getPublicSanitizedState(globalPortalState));
});

// Update universal portal state (any section or multiple sections)
app.put("/api/state", (req, res) => {
  const updates = req.body;
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
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
    "advibeLeads"
  ];

  const changedKeys: string[] = [];
  for (const key of allowedKeys) {
    if (Object.prototype.hasOwnProperty.call(updates, key) && Array.isArray(updates[key])) {
      (globalPortalState as any)[key] = updates[key];
      changedKeys.push(key);
    }
  }

  if (changedKeys.length > 0) {
    saveGlobalState();
    broadcastStateUpdate(changedKeys);
  }

  res.json({
    status: "ok",
    changedKeys,
    updatedAt: globalPortalState.updatedAt
  });
});

// ============================================================================
// ADVIBE INTERACTIVE MEGAPROJECT SHOWCASE API ROUTES
// ============================================================================
const advibeStore: {
  projects: any[];
  leads: any[];
  permittedDealers: Set<string>;
} = {
  projects: globalPortalState.advibeProjects || [],
  leads: globalPortalState.advibeLeads || [],
  permittedDealers: new Set(["agency-1", "agency-2"])
};

function requireAdvibeAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const userRole = (req.headers["x-user-role"] as string) || "";
  const agencyId = (req.headers["x-agency-id"] as string) || "";

  if (userRole === "admin") {
    return next();
  }
  if (userRole === "agency" && advibeStore.permittedDealers.has(agencyId)) {
    return next();
  }

  return res.status(403).json({
    error: "Forbidden: Requires Super Admin or Authorized Dealer privileges for AdVibe."
  });
}

// GET all AdVibe projects
app.get("/api/advibe/projects", (_req, res) => {
  res.json({ projects: globalPortalState.advibeProjects || advibeStore.projects });
});

// GET single AdVibe project by slug
app.get("/api/advibe/projects/:slug", (req, res) => {
  const list = globalPortalState.advibeProjects || advibeStore.projects;
  const project = list.find(
    (p) => p.slug === req.params.slug || p.id === req.params.slug
  );
  if (!project) {
    return res.status(404).json({ error: "AdVibe project not found" });
  }
  res.json({ project });
});

// POST / PUT AdVibe project (Create or Update)
app.post("/api/advibe/projects", requireAdvibeAuth, (req, res) => {
  const project = req.body;
  if (!project || typeof project.title !== "string" || typeof project.slug !== "string") {
    return res.status(400).json({ error: "Project title and slug are required." });
  }

  const list = globalPortalState.advibeProjects || advibeStore.projects;
  const existingIdx = list.findIndex((p) => p.id === project.id);
  if (existingIdx >= 0) {
    list[existingIdx] = {
      ...project,
      updatedAt: new Date().toISOString().split("T")[0]
    };
  } else {
    list.unshift({
      ...project,
      id: project.id || `advibe-proj-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0]
    });
  }

  advibeStore.projects = list;
  globalPortalState.advibeProjects = list;
  saveGlobalState();
  broadcastStateUpdate(["advibeProjects"]);

  res.json({ status: "ok", project });
});

// DELETE AdVibe project
app.delete("/api/advibe/projects/:id", requireAdvibeAuth, (req, res) => {
  const list = globalPortalState.advibeProjects || advibeStore.projects;
  const nextList = list.filter((p) => p.id !== req.params.id);
  advibeStore.projects = nextList;
  globalPortalState.advibeProjects = nextList;
  saveGlobalState();
  broadcastStateUpdate(["advibeProjects"]);

  res.json({ status: "deleted", id: req.params.id });
});

// POST duplicate AdVibe project
app.post("/api/advibe/projects/:id/duplicate", requireAdvibeAuth, (req, res) => {
  const list = globalPortalState.advibeProjects || advibeStore.projects;
  const source = list.find((p) => p.id === req.params.id);
  if (!source) {
    return res.status(404).json({ error: "Source project not found" });
  }
  const copy = {
    ...source,
    id: `advibe-proj-${Date.now()}`,
    title: `${source.title} (Copy)`,
    slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
    status: "Booking Open",
    viewsCount: 0,
    leadsCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0]
  };
  list.unshift(copy);
  advibeStore.projects = list;
  globalPortalState.advibeProjects = list;
  saveGlobalState();
  broadcastStateUpdate(["advibeProjects"]);

  res.json({ status: "duplicated", project: copy });
});

// POST public lead from AdVibe interactive showcase
app.post("/api/advibe/leads", (req, res) => {
  const lead = req.body;
  if (!lead || typeof lead.name !== "string" || typeof lead.phone !== "string") {
    return res.status(400).json({ error: "Lead name and phone are required." });
  }
  const newLead = {
    id: `advibe-lead-${Date.now()}`,
    projectId: String(lead.projectId || ""),
    projectTitle: String(lead.projectTitle || ""),
    name: lead.name.trim().slice(0, 120),
    phone: lead.phone.trim().slice(0, 40),
    email: String(lead.email || "").trim().slice(0, 120),
    preferredUnit: String(lead.preferredUnit || "").trim().slice(0, 120),
    message: String(lead.message || "").trim().slice(0, 1000),
    contactPreference: lead.contactPreference || "whatsapp",
    source: String(lead.source || "website_advibe"),
    status: "new",
    createdAt: new Date().toISOString()
  };
  const leadsList = globalPortalState.advibeLeads || advibeStore.leads;
  leadsList.unshift(newLead);
  advibeStore.leads = leadsList;
  globalPortalState.advibeLeads = leadsList;
  saveGlobalState();
  broadcastStateUpdate(["advibeLeads"]);

  res.json({ status: "ok", lead: newLead });
});

// GET all AdVibe leads (Admin / Authorized Dealer)
app.get("/api/advibe/leads", requireAdvibeAuth, (_req, res) => {
  res.json({ leads: globalPortalState.advibeLeads || advibeStore.leads });
});

// POST toggle dealer AdVibe permission (Super Admin only)
app.post("/api/advibe/permissions", requireAdvibeAuth, (req, res) => {
  const { agencyId, allowed } = req.body || {};
  if (!agencyId || typeof agencyId !== "string") {
    return res.status(400).json({ error: "agencyId is required" });
  }
  if (allowed) {
    advibeStore.permittedDealers.add(agencyId);
  } else {
    advibeStore.permittedDealers.delete(agencyId);
  }
  res.json({
    status: "ok",
    agencyId,
    allowed: advibeStore.permittedDealers.has(agencyId)
  });
});

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    geminiConfigured: Boolean(getGeminiClient()),
    stateUpdatedAt: globalPortalState.updatedAt
  });
});

// Gemini AI Real Estate Assistant Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, context } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A valid message is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        reply:
          "Welcome to ri8click Real Estate & Modular Homes Consortium! Tell me your budget, preferred city (Taxila, Faisal Hills, Islamabad, Rawalpindi, or Lahore), or whether you're interested in Residential Villas, Commercial Highrises, or Readymade Space Capsule Smart Houses. For immediate assistance, WhatsApp +92 336-5666727.",
        fallback: true
      });
    }

    const systemInstruction = `You are the official AI Property & Investment Advisor for "ri8click" (ri8click.com), Pakistan's premier verified real estate portal and consortium group specializing in:
1. Taxila & Faisal Hills (Executive Block, Block A, B, C, Commercial Broadway), Kohistan Enclave, Multi Gardens B-17, DHA Islamabad/Rawalpindi, Bahria Town, and Lahore.
2. Commercial Plazas, Retail Shops, Corporate Offices, and High-ROI real estate investments.
3. Readymade Space Capsule Smart Houses & Curved Container Modular Homes (deployed in 7-30 days across Pakistan).
4. Ri8Click Consortium Group services: Turnkey Construction, German UPVC Windows & Doors Manufacturing, and PropTech solutions.

Official Contact & WhatsApp: +92 336-5666727
Always be polite, concise, accurate, and helpful. Use Pakistani Rupees (PKR, Lakh, Crore) and local area units (Marla, Kanal, Sq Ft).
${context ? `\nCurrent Portal Context:\n${String(context).slice(0, 2000)}` : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message.slice(0, 1000),
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500
      }
    });

    return res.json({
      reply:
        response.text ||
        "Please contact our senior advisors on WhatsApp at +92 336-5666727 for personalized property guidance.",
      fallback: false
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(200).json({
      reply:
        "I can help you explore properties in Faisal Hills Taxila, Islamabad, Rawalpindi, and Lahore, or share details on our Readymade Capsule Smart Homes. Connect with our team directly on WhatsApp at +92 336-5666727.",
      fallback: true
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
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
