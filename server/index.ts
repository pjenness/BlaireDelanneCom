import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Image path mapping for backward compatibility
const categoryImageMapping = {
  // Fashion images
  'investment-dressing.jpg': 'fashion-category.jpg',
  'sustainable-fashion.jpg': 'fashion-category.jpg',
  'accessories-styling.jpg': 'fashion-category.jpg',
  
  // Travel images
  'luxury-travel.jpg': 'travel-category.jpg',
  'new-zealand-adventure.jpg': 'travel-category.jpg',
  'moving-to-sydney.jpg': 'travel-category.jpg',
  'sydney-culinary-treasures.jpg': 'travel-category.jpg',
  'waiheke-vineyards.jpg': 'travel-category.jpg',
  'central-otago-wine.jpg': 'travel-category.jpg',
  
  // Wedding images
  'byron-bay-weddings.jpg': 'wedding-category.jpg',
  'luxury-wedding-planning.jpg': 'wedding-category.jpg',
  'queenstown-weddings.jpg': 'wedding-category.jpg',
  'sustainable-weddings.jpg': 'wedding-category.jpg',
  'sustainable-weddings-nz.jpg': 'wedding-category.jpg',
  
  // Hospitality images
  'wellness-hospitality.jpg': 'hospitality-category.jpg',
  'tablescaping-art.jpg': 'hospitality-category.jpg',
  'boutique-hotel-partnership.jpg': 'hospitality-category.jpg',
  'wellness-event-design.jpg': 'hospitality-category.jpg',
  
  // Personal/other images
  'new-zealand-year-reflection.jpg': 'personal-category.jpg',
  'autumn-harvest-festivals-otago.jpg': 'personal-category.jpg'
};

// Handle image requests with mapping for backward compatibility
app.use('/images/blog/:filename', (req, res, next) => {
  const requestedFile = req.params.filename;
  
  // If the requested file is in our mapping, redirect to the category image
  if (categoryImageMapping[requestedFile]) {
    const categoryImage = categoryImageMapping[requestedFile];
    res.redirect(`/images/blog/${categoryImage}`);
  } else {
    // Otherwise continue to the regular static file handling
    next();
  }
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
