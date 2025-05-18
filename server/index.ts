import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle image requests with mapping for date-based filenames
app.use('/images/blog/:filename', (req, res, next) => {
  const requestedFile = req.params.filename;
  
  // Check if it has a date format already (YYYY_MM_DD)
  if (requestedFile.match(/^\d{4}_\d{2}_\d{2}/)) {
    // It's already a properly formatted date-based filename, proceed
    next();
    return;
  }
  
  // If the filename contains a date but with hyphens, normalize to underscores
  const dateParts = requestedFile.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (dateParts) {
    const [_, year, month, day, slug] = dateParts;
    const normalizedFilename = `${year}_${month}_${day}-${slug}`;
    res.redirect(`/images/blog/${normalizedFilename}`);
    return;
  }
  
  // For legacy filenames without dates, try to find a matching file with date prefix
  fs.readdir(path.join(process.cwd(), 'images/blog'), (err, files) => {
    if (err) {
      console.error('Error reading blog images directory:', err);
      next();
      return;
    }
    
    // Extract the slug part (remove .jpg extension)
    const slug = requestedFile.replace(/\.jpg$/, '');
    
    // Look for a file that contains this slug
    const matchingFile = files.find(file => file.includes(slug));
    if (matchingFile) {
      res.redirect(`/images/blog/${matchingFile}`);
    } else {
      // If no match, pass to the next middleware
      next();
    }
  });
});

// Serve static image files before any other routes
app.use('/images', express.static(path.join(process.cwd(), 'images')));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
