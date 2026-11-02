import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

//============ changes made on 21-10-26 ========
//import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".envRE") });
//dotenv.config();


// END ====== 21-10-16 ======

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily / safely on server
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "ri8click-real-estate-api", timestamp: new Date().toISOString() });
});

// Gemini AI Chatbot endpoint for ri8click Real Estate & Consortium
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "A valid message is required." });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Friendly fallback if API key is not yet set in environment
      res.json({
        reply: `Thank you for contacting ri8click! I am your AI Property Advisor for ri8click Real Estate & Consortium. We specialize in premier properties across Taxila, Faisal Hills, Islamabad, Rawalpindi, and Lahore, as well as Commercial Plazas and futuristic Readymade Capsule Modular Houses. How may I assist your property or investment search today?`,
        source: "fallback"
      });
      return;
    }

    const systemInstruction = `You are the official AI Property Advisor for "ri8click" (formerly Homeland, now upgraded to ri8click Multi-Agent Real Estate & Group of Companies).
You represent a premier corporate consortium operating in Pakistan and internationally with 5 major divisions:
1. Ri8Click Real Estate & Property Network: Multi-agent portal offering verified residential, commercial, luxury villas, and plots across Punjab (Taxila, Lahore, Rawalpindi, Faisalabad) and Islamabad (Faisal Hills, B-17 Multi Gardens, Blue Area, Eighteen, DHA, Bahria Town).
2. Ri8Click Turnkey Construction & Civil Works: Modern structural building, luxury finishing, and architectural construction.
3. Ri8Click UPVC & Architectural Products: Energy-efficient double-glazed UPVC windows, structural doors, and thermal insulation systems.
4. Ri8Click Technology Services & AI Solutions: PropTech portals, real estate CRM, multi-agent management, and digital twin tours.
5. Ri8Click Readymade Capsule & Modular Prefab Smart Houses: High-tech prefabricated luxury living capsules and eco-pods delivered and installed anywhere.

Key Areas Highlight:
- Taxila: Historic and rapidly developing investment hub in Punjab.
- Faisal Hills (near Taxila & Margalla Hills): Prime residential and commercial blocks (Executive Block, Block A, B, C, Commercial Broadway).
- Islamabad & Rawalpindi: B-17 Multi Gardens, Eighteen, Top City, Blue Area commercial towers.

Guidelines:
- Provide polite, sophisticated, highly professional real estate advice.
- Assist users with property valuations, buying/selling advice, commercial ROI calculations, and scheduling agent site visits.
- Emphasize ri8click's verified multi-agent network, transparency, and watermark verification.
- Offer to connect them via WhatsApp or schedule an agent consultation.
- Keep answers clear, structured, and helpful.`;

    const chat = ai.chats.create({
      model: "gemini-3.8-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Send the user query
    const response = await chat.sendMessage({
      message: message,
    });

    const reply = response.text || "I apologize, but I was unable to generate a response. Please reach out to our 24/7 WhatsApp helpline for direct agent assistance.";
    res.json({ reply, source: "gemini" });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Error processing request with AI assistant",
      reply: "We are currently experiencing high request volume. You can connect directly with a ri8click verified agent in Taxila or Faisal Hills via our WhatsApp chat button on the screen!"
    });
  }
});

// ==========================================
// ADVIBE MODULE SERVER-SIDE API & CRUD
// ==========================================
import { initialAdvibeProjects, initialAdvibeLeads } from "./src/data/advibeDemoData";

// In-memory persistent state (with initial seed from demo data)
let advibeProjects = [...initialAdvibeProjects];
let advibeLeads = [...initialAdvibeLeads];
let permittedDealers = new Set<string>(['agency-1', 'agency-2']); // default permitted dealers

// List all AdVibe projects
app.get("/api/advibe/projects", (req, res) => {
  const role = (req.headers["x-user-role"] as string) || (req.query.role as string) || "customer";
  const agencyId = (req.headers["x-agency-id"] as string) || (req.query.agencyId as string);
  const includeUnpublished = role === "admin" || (role === "agency" && permittedDealers.has(agencyId));

  let results = advibeProjects;
  if (!includeUnpublished) {
    results = results.filter(p => p.published && !p.archived);
  }

  // Optional filters
  if (req.query.type) {
    results = results.filter(p => p.type === req.query.type);
  }
  if (req.query.city) {
    results = results.filter(p => p.city.toLowerCase().includes((req.query.city as string).toLowerCase()));
  }
  if (req.query.featured === "true") {
    results = results.filter(p => p.featured);
  }

  res.json({ success: true, count: results.length, projects: results });
});

// Get single project by slug or ID
app.get("/api/advibe/projects/:slugOrId", (req, res) => {
  const { slugOrId } = req.params;
  const project = advibeProjects.find(p => p.slug === slugOrId || p.id === slugOrId);

  if (!project) {
    res.status(404).json({ success: false, error: "AdVibe Project not found" });
    return;
  }

  // Increment views
  project.viewsCount = (project.viewsCount || 0) + 1;
  res.json({ success: true, project });
});

// Create new AdVibe project
app.post("/api/advibe/projects", (req, res) => {
  const role = (req.headers["x-user-role"] as string) || req.body.role || "customer";
  const agencyId = (req.headers["x-agency-id"] as string) || req.body.agencyId;

  // Server-side permission check:
  if (role !== "admin" && (!agencyId || !permittedDealers.has(agencyId))) {
    res.status(403).json({
      success: false,
      error: "Forbidden: Only Super Admins and authorized certified brokerages have permission to create AdVibe projects."
    });
    return;
  }

  const newProjectData = req.body;
  if (!newProjectData.title) {
    res.status(400).json({ success: false, error: "Project title is required" });
    return;
  }

  const generatedId = `advibe-proj-${Date.now()}`;
  const generatedSlug = (newProjectData.slug || newProjectData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")) || generatedId;

  const newProject = {
    ...newProjectData,
    id: generatedId,
    slug: generatedSlug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewsCount: 0
  };

  advibeProjects.unshift(newProject);
  res.status(201).json({ success: true, project: newProject });
});

// Update AdVibe project
app.put("/api/advibe/projects/:id", (req, res) => {
  const role = (req.headers["x-user-role"] as string) || req.body.role || "customer";
  const agencyId = (req.headers["x-agency-id"] as string) || req.body.agencyId;
  const { id } = req.params;

  const index = advibeProjects.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, error: "Project not found" });
    return;
  }

  // Permission enforcement
  const existing = advibeProjects[index];
  if (role !== "admin" && existing.dealerId !== agencyId && !permittedDealers.has(agencyId)) {
    res.status(403).json({ success: false, error: "Unauthorized to edit this project." });
    return;
  }

  advibeProjects[index] = {
    ...existing,
    ...req.body,
    id: existing.id, // prevent ID change
    updatedAt: new Date().toISOString()
  };

  res.json({ success: true, project: advibeProjects[index] });
});

// Delete or Archive AdVibe project
app.delete("/api/advibe/projects/:id", (req, res) => {
  const role = (req.headers["x-user-role"] as string) || (req.query.role as string) || "customer";
  const agencyId = (req.headers["x-agency-id"] as string) || (req.query.agencyId as string);
  const { id } = req.params;

  const index = advibeProjects.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, error: "Project not found" });
    return;
  }

  if (role !== "admin" && advibeProjects[index].dealerId !== agencyId) {
    res.status(403).json({ success: false, error: "Unauthorized to delete this project." });
    return;
  }

  const deleted = advibeProjects.splice(index, 1);
  res.json({ success: true, message: "Project deleted successfully", project: deleted[0] });
});

// Duplicate AdVibe project
app.post("/api/advibe/projects/:id/duplicate", (req, res) => {
  const { id } = req.params;
  const original = advibeProjects.find(p => p.id === id);

  if (!original) {
    res.status(404).json({ success: false, error: "Original project not found" });
    return;
  }

  const copyId = `advibe-proj-${Date.now()}`;
  const copySlug = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;

  const duplicate = {
    ...original,
    id: copyId,
    slug: copySlug,
    title: `${original.title} (Copy)`,
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewsCount: 0
  };

  advibeProjects.unshift(duplicate);
  res.status(201).json({ success: true, project: duplicate });
});

// Leads List
app.get("/api/advibe/leads", (req, res) => {
  const role = (req.headers["x-user-role"] as string) || (req.query.role as string) || "customer";
  const projectId = req.query.projectId as string;

  let leads = advibeLeads;
  if (projectId) {
    leads = leads.filter(l => l.projectId === projectId);
  }

  res.json({ success: true, count: leads.length, leads });
});

// Submit Lead
app.post("/api/advibe/leads", (req, res) => {
  const { projectId, projectTitle, name, phone, email, preferredUnit, message, contactPreference, source } = req.body;

  if (!name || !phone) {
    res.status(400).json({ success: false, error: "Name and Phone number are required." });
    return;
  }

  const newLead = {
    id: `lead-adv-${Date.now()}`,
    projectId: projectId || "general",
    projectTitle: projectTitle || "AdVibe Project",
    name,
    phone,
    email: email || "",
    preferredUnit: preferredUnit || "General Inquiry",
    message: message || "Interested in learning more about this project.",
    contactPreference: contactPreference || "whatsapp",
    source: source || "website_advibe",
    status: "new" as const,
    createdAt: new Date().toISOString()
  };

  advibeLeads.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead });
});

// Update Lead Status
app.put("/api/advibe/leads/:id", (req, res) => {
  const { id } = req.params;
  const index = advibeLeads.findIndex(l => l.id === id);

  if (index === -1) {
    res.status(404).json({ success: false, error: "Lead not found" });
    return;
  }

  advibeLeads[index] = {
    ...advibeLeads[index],
    ...req.body
  };

  res.json({ success: true, lead: advibeLeads[index] });
});

// Toggle Agency Permission for AdVibe
app.patch("/api/advibe/agencies/:agencyId/permission", (req, res) => {
  const role = (req.headers["x-user-role"] as string) || req.body.role || "customer";
  if (role !== "admin") {
    res.status(403).json({ success: false, error: "Super Admin privilege required." });
    return;
  }

  const { agencyId } = req.params;
  const { permitted } = req.body;

  if (permitted) {
    permittedDealers.add(agencyId);
  } else {
    permittedDealers.delete(agencyId);
  }

  res.json({ success: true, agencyId, permitted: permittedDealers.has(agencyId) });
});


async function startServer() {
  // Vite middleware for development
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
    console.log(`ri8click Corporate Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
