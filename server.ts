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
  INITIAL_TOP_MENU_ITEMS,
} from "./src/data/mockData";
import {
  initialAdvibeProjects,
  initialAdvibeLeads,
} from "./src/data/advibeDemoData";

dotenv.config({ path: ".envRE" });
dotenv.config();

const DATA_DIR = path.resolve(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const PUBLIC_UPLOADS_DIR = path.resolve(process.cwd(), "public", "uploads");
const STATE_FILE = path.join(DATA_DIR, "portal-state.json");
const BACKUP_STATE_FILE = path.join(DATA_DIR, "portal-state.backup.json");

export interface GlobalPortalState {
  schemaVersion: string;
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
  topMenuItems: any[];
  updatedAt: string;
  revision: number;
}

function ensureDirectories() {
  for (const dir of [DATA_DIR, UPLOADS_DIR, PUBLIC_UPLOADS_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
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

function normalizeTopMenuItems(items?: any[]): any[] {
  if (!Array.isArray(items) || items.length === 0) {
    return INITIAL_TOP_MENU_ITEMS.map((item) => ({ ...item }));
  }
  const normalized = items
    .filter((item) => item && typeof item === "object" && item.id && item.label)
    .map((item, idx) => ({
      id: String(item.id),
      label: String(item.label).trim() || "Menu Item",
      iconName: String(item.iconName || "Home"),
      order: typeof item.order === "number" ? item.order : idx + 1,
      isVisible: item.isVisible !== false,
      targetSectionId: item.targetSectionId || undefined,
      customUrl: item.customUrl || undefined,
    }));

  for (const defItem of INITIAL_TOP_MENU_ITEMS) {
    if (!normalized.some((i) => i.id === defItem.id)) {
      normalized.push({ ...defItem, order: normalized.length + 1 });
    }
  }

  return normalized
    .sort((a, b) => a.order - b.order)
    .map((item, idx) => ({ ...item, order: idx + 1 }));
}

function syncPropertiesWithAgencies(properties: any[], agencies: any[]): any[] {
  if (!Array.isArray(properties)) return INITIAL_PROPERTIES;
  if (!Array.isArray(agencies) || agencies.length === 0) return properties;

  const agencyMap = new Map(agencies.map((a) => [a.id, a]));
  return properties.map((prop) => {
    const matchedAgency = agencyMap.get(prop.agencyId);
    if (!matchedAgency) return prop;
    const latestAvatar =
      matchedAgency.avatar || matchedAgency.logo || prop.agentAvatar;
    return {
      ...prop,
      agentName: matchedAgency.name || prop.agentName,
      agentCompany: matchedAgency.companyName || prop.agentCompany,
      agentPhone: matchedAgency.phone || prop.agentPhone,
      agentWhatsApp: (
        matchedAgency.whatsapp ||
        prop.agentWhatsApp ||
        ""
      ).replace(/[^0-9]/g, ""),
      agentAvatar: latestAvatar,
    };
  });
}

function normalizeHeroSlides(slides: any[], fallback: any[]): any[] {
  if (!Array.isArray(slides) || slides.length === 0) {
    return fallback;
  }
  return slides
    .filter((s) => s && typeof s === "object" && s.title)
    .map((s, idx) => {
      const gallery =
        Array.isArray(s.galleryImages) && s.galleryImages.length > 0
          ? s.galleryImages.filter(Boolean)
          : s.imageUrl
            ? [s.imageUrl]
            : [];
      const primaryImage = gallery[0] || s.imageUrl || "";
      const videoUrl =
        s.videoUrl || s.samplePropertyData?.virtualTourVideoUrl || "";
      const videoTitle =
        s.videoTitle ||
        s.samplePropertyData?.virtualTourVideoTitle ||
        `${s.title} — 360° Virtual Tour`;

      return {
        ...s,
        id: s.id || `slide-${idx + 1}-${Date.now()}`,
        imageUrl: primaryImage,
        galleryImages: gallery.length > 0 ? gallery : [primaryImage],
        videoUrl,
        videoTitle,
        isActive: s.isActive !== false,
        order: typeof s.order === "number" ? s.order : idx + 1,
        tourRoomsCount:
          typeof s.tourRoomsCount === "number"
            ? s.tourRoomsCount
            : Math.max(gallery.length, 4),
        features:
          Array.isArray(s.features) && s.features.length > 0
            ? s.features
            : [
                "100% Verified Ri8click Consortium Inventory",
                "German UPVC Thermal & Acoustic Glazing",
                "Direct Transfer & Turnkey Delivery",
              ],
        samplePropertyData: {
          title: s.samplePropertyData?.title || s.title,
          category: s.samplePropertyData?.category || "modular",
          virtualTourVideoUrl: videoUrl,
          virtualTourVideoTitle: videoTitle,
          location: {
            city:
              s.samplePropertyData?.location?.city ||
              String(s.location || "Taxila").split("/")[0]?.trim() ||
              "Taxila",
            society:
              s.samplePropertyData?.location?.society ||
              s.society ||
              "Faisal Hills",
            province: s.samplePropertyData?.location?.province || "Punjab",
          },
        },
      };
    });
}

function buildDefaultState(): GlobalPortalState {
  return {
    schemaVersion: "ri8click_db_v2",
    properties: syncPropertiesWithAgencies(
      INITIAL_PROPERTIES,
      INITIAL_AGENCIES
    ),
    agencies: INITIAL_AGENCIES,
    provinceCityData: INITIAL_PROVINCE_CITIES,
    heroSlides: normalizeHeroSlides(INITIAL_HERO_SLIDES, INITIAL_HERO_SLIDES),
    blogs: INITIAL_BLOGS,
    sitePortions: INITIAL_SITE_PORTIONS,
    consortiumDivisions: CONSORTIUM_DIVISIONS,
    userAccounts: mergeAccountsWithDefaultPasswords(initialUserAccounts),
    advibeProjects: initialAdvibeProjects,
    advibeLeads: initialAdvibeLeads,
    topMenuItems: normalizeTopMenuItems(INITIAL_TOP_MENU_ITEMS),
    updatedAt: new Date().toISOString(),
    revision: 1,
  };
}

function parseStateFile(filePath: string): any | null {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      if (raw && raw.trim().length > 2) {
        return JSON.parse(raw);
      }
    }
  } catch (err) {
    console.error(`Error reading state file ${filePath}:`, err);
  }
  return null;
}

function loadGlobalState(): GlobalPortalState {
  const defaults = buildDefaultState();
  try {
    ensureDirectories();
    const parsed =
      parseStateFile(STATE_FILE) || parseStateFile(BACKUP_STATE_FILE);

    if (parsed && typeof parsed === "object") {
      const hydratedAgencies =
        Array.isArray(parsed.agencies) && parsed.agencies.length > 0
          ? parsed.agencies
          : defaults.agencies;
      const rawProperties =
        Array.isArray(parsed.properties) && parsed.properties.length > 0
          ? parsed.properties
          : defaults.properties;

      return {
        schemaVersion: "ri8click_db_v2",
        properties: syncPropertiesWithAgencies(rawProperties, hydratedAgencies),
        agencies: hydratedAgencies,
        provinceCityData:
          Array.isArray(parsed.provinceCityData) &&
          parsed.provinceCityData.length > 0
            ? parsed.provinceCityData
            : defaults.provinceCityData,
        heroSlides: normalizeHeroSlides(
          parsed.heroSlides,
          defaults.heroSlides
        ),
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
        topMenuItems: normalizeTopMenuItems(parsed.topMenuItems),
        updatedAt: parsed.updatedAt || defaults.updatedAt,
        revision:
          typeof parsed.revision === "number" && parsed.revision > 0
            ? parsed.revision
            : 1,
      };
    }
  } catch (err) {
    console.error("Failed to hydrate portal-state.json:", err);
  }
  saveGlobalState(defaults);
  return defaults;
}

function saveGlobalState(state: GlobalPortalState) {
  try {
    ensureDirectories();
    state.updatedAt = new Date().toISOString();
    state.revision =
      (typeof state.revision === "number" ? state.revision : 0) + 1;
    const serialized = JSON.stringify(state, null, 2);
    const tempFile = `${STATE_FILE}.tmp`;
    fs.writeFileSync(tempFile, serialized, "utf-8");
    fs.renameSync(tempFile, STATE_FILE);
    fs.writeFileSync(BACKUP_STATE_FILE, serialized, "utf-8");
  } catch (err) {
    console.error("Failed to save portal-state.json:", err);
  }
}

function persistDataUriToDiskIfNeeded(val: string): string {
  if (typeof val !== "string") return val;
  const trimmed = val.trim();
  const match = trimmed.match(
    /^data:(image\/[a-zA-Z0-9.+-]+|video\/[a-zA-Z0-9.+-]+);base64,(.+)$/
  );
  if (!match) return val;

  if (trimmed.length < 60000) return val;

  try {
    ensureDirectories();
    const mimeType = match[1];
    const base64Data = match[2];
    let ext = mimeType.split("/")[1] || "bin";
    if (ext === "jpeg") ext = "jpg";
    if (ext === "quicktime") ext = "mov";
    ext = ext.replace(/[^a-zA-Z0-9]/g, "");
    const fileName = `media-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(base64Data, "base64");

    fs.writeFileSync(path.join(UPLOADS_DIR, fileName), buffer);
    fs.writeFileSync(path.join(PUBLIC_UPLOADS_DIR, fileName), buffer);

    return `/uploads/${fileName}`;
  } catch (err) {
    console.error("Failed to offload DataURI media to disk:", err);
    return val;
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
    if (trimmed.startsWith("data:image/") || trimmed.startsWith("data:video/")) {
      return persistDataUriToDiskIfNeeded(trimmed);
    }
  }
  return input;
}

function sanitizeStateForClient(state: GlobalPortalState): GlobalPortalState {
  const copy: GlobalPortalState = { ...state };
  if (Array.isArray(copy.userAccounts)) {
    copy.userAccounts = mergeAccountsWithDefaultPasswords(copy.userAccounts);
  }
  if (Array.isArray(copy.heroSlides)) {
    copy.heroSlides = normalizeHeroSlides(
      copy.heroSlides,
      INITIAL_HERO_SLIDES
    );
  }
  if (Array.isArray(copy.topMenuItems)) {
    copy.topMenuItems = normalizeTopMenuItems(copy.topMenuItems);
  }
  if (Array.isArray(copy.properties) && Array.isArray(copy.agencies)) {
    copy.properties = syncPropertiesWithAgencies(
      copy.properties,
      copy.agencies
    );
  }
  return copy;
}

const globalPortalState: GlobalPortalState = loadGlobalState();

async function startServer() {
  ensureDirectories();
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (req.path.startsWith("/api/")) {
      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
    next();
  });

  app.use(
    "/uploads",
    express.static(UPLOADS_DIR, { maxAge: "365d", immutable: true })
  );
  app.use(
    "/uploads",
    express.static(PUBLIC_UPLOADS_DIR, { maxAge: "365d", immutable: true })
  );

  app.use(express.json({ limit: "150mb" }));
  app.use(express.urlencoded({ extended: true, limit: "150mb" }));

  const sseClients = new Set<express.Response>();

  function broadcastStateUpdate() {
    const safePayload = JSON.stringify({
      type: "STATE_UPDATED",
      updatedAt: globalPortalState.updatedAt,
      revision: globalPortalState.revision,
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
        type: "CONNECTED",
        updatedAt: globalPortalState.updatedAt,
        revision: globalPortalState.revision || 1,
      })}\n\n`
    );

    sseClients.add(res);
    req.on("close", () => {
      sseClients.delete(res);
    });
  });

  app.post("/api/media/upload", (req, res) => {
    try {
      const { dataUrl, fileName } = req.body || {};
      if (!dataUrl || typeof dataUrl !== "string") {
        return res.status(400).json({ error: "Valid dataUrl is required" });
      }
      const match = dataUrl.match(
        /^data:(image\/[a-zA-Z0-9.+-]+|video\/[a-zA-Z0-9.+-]+);base64,(.+)$/
      );
      if (!match) {
        return res.status(400).json({ error: "Unsupported media format" });
      }

      ensureDirectories();
      const mimeType = match[1];
      const base64Data = match[2];
      let ext = mimeType.split("/")[1] || "bin";
      if (ext === "jpeg") ext = "jpg";
      if (ext === "quicktime") ext = "mov";
      ext = ext.replace(/[^a-zA-Z0-9]/g, "");

      const safeBaseName = String(fileName || "project-media")
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .slice(0, 40);
      const finalName = `${safeBaseName}-${Date.now()}.${ext}`;
      const buffer = Buffer.from(base64Data, "base64");

      fs.writeFileSync(path.join(UPLOADS_DIR, finalName), buffer);
      fs.writeFileSync(path.join(PUBLIC_UPLOADS_DIR, finalName), buffer);

      const url = `/uploads/${finalName}`;
      return res.json({ status: "ok", url, fileName: finalName, mimeType });
    } catch (err: any) {
      console.error("Media upload error:", err);
      return res
        .status(500)
        .json({ error: "Failed to save uploaded media file" });
    }
  });

  // Structured Database Export & Import Endpoints for 1:1 SQL/NoSQL Migration
  app.get("/api/db/export", (_req, res) => {
    res.json({
      schemaVersion: "ri8click_db_v2",
      exportedAt: new Date().toISOString(),
      tables: sanitizeStateForClient(globalPortalState),
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

  app.get("/api/hero-slides", (_req, res) => {
    res.json({
      status: "ok",
      revision: globalPortalState.revision,
      updatedAt: globalPortalState.updatedAt,
      heroSlides: normalizeHeroSlides(
        globalPortalState.heroSlides,
        INITIAL_HERO_SLIDES
      ),
    });
  });

  app.put("/api/hero-slides", (req, res) => {
    const incomingSlides = sanitizeIncomingPayload(
      req.body?.heroSlides || req.body
    );
    if (!Array.isArray(incomingSlides) || incomingSlides.length === 0) {
      return res
        .status(400)
        .json({ error: "At least 1 valid hero slide is required." });
    }

    globalPortalState.heroSlides = normalizeHeroSlides(
      incomingSlides,
      globalPortalState.heroSlides
    );
    saveGlobalState(globalPortalState);
    broadcastStateUpdate();

    return res.json({
      status: "ok",
      updatedAt: globalPortalState.updatedAt,
      revision: globalPortalState.revision,
      heroSlides: globalPortalState.heroSlides,
    });
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
      "topMenuItems",
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
          changed = true;
        } else if (key === "heroSlides") {
          if (updates.heroSlides.length > 0) {
            globalPortalState.heroSlides = normalizeHeroSlides(
              updates.heroSlides,
              globalPortalState.heroSlides
            );
            changed = true;
          }
        } else if (key === "topMenuItems") {
          if (updates.topMenuItems.length > 0) {
            globalPortalState.topMenuItems = normalizeTopMenuItems(
              updates.topMenuItems
            );
            changed = true;
          }
        } else if (updates[key].length > 0 || key === "advibeLeads") {
          (globalPortalState as any)[key] = updates[key];
          changed = true;
        }
      }
    }

    if (changed) {
      globalPortalState.properties = syncPropertiesWithAgencies(
        globalPortalState.properties,
        globalPortalState.agencies
      );
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
      heroSlidesCount: Array.isArray(globalPortalState.heroSlides)
        ? globalPortalState.heroSlides.length
        : 0,
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
