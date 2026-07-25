import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface WaitlistEntry {
  email: string;
  timestamp: string;
  position: number;
}

const waitlist: WaitlistEntry[] = [];
const BASE_COUNT = 247;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.get(["/api/waitlist", "/api/waitlist/"], (req, res) => {
    res.json({
      count: BASE_COUNT + waitlist.length,
      subscribersCount: waitlist.length,
    });
  });

  app.post(["/api/waitlist", "/api/waitlist/"], (req, res) => {
    const { email, timestamp, position } = req.body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Veuillez entrer un email valide" });
    }

    const entryPosition = position || BASE_COUNT + waitlist.length + 1;
    const newEntry: WaitlistEntry = {
      email,
      timestamp: timestamp || new Date().toISOString(),
      position: entryPosition,
    };

    // Prevent duplicate emails or log them
    const existing = waitlist.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      waitlist.push(newEntry);
    }

    const currentCount = BASE_COUNT + waitlist.length;

    return res.status(200).json({
      success: true,
      message: "Vous êtes inscrit !",
      position: entryPosition,
      count: currentCount,
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
