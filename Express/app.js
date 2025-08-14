// Global imports
const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Hardcoded ports
const WEBSITE_PORT = 3000; // Main website and web app
const API_PORT = 3001; // API endpoints (if split in future)
const port = WEBSITE_PORT;

// Initialize express app
const app = express();

// Middleware configuration
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(cookies());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// User session middleware
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
app.use(userLoggedMiddleware);

// Load products data function (for API endpoints)
const loadProductsData = () => {
  try {
    const dataPath = path.join(__dirname, "../productsDataBase.json");
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading products data:", error);
    return [];
  }
};

// =================== WEB APPLICATION ROUTES ===================

// Import route modules
const mainRoutes = require("./routes/mainRoutes");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Use route modules
app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);
app.use("/carrito", cartRoutes);

// 404 handler for web routes
app.use((req, res, next) => {
  if (req.url.startsWith("/api/")) {
    // API 404
    res.status(404).json({ error: "API endpoint not found" });
  } else {
    // Web 404
    res.status(404).render("not-found");
  }
});

// Server listening
app.listen(port, () => {
  console.log(`🚀 Hampi Yura Server running on port ${WEBSITE_PORT}`);
  console.log(`📱 Web App: http://localhost:${WEBSITE_PORT}`);
  console.log(`🔗 API Docs: http://localhost:${WEBSITE_PORT}/api`);
  console.log(
    `📊 Dashboard API available at http://localhost:${WEBSITE_PORT}/api/*`
  );
  // If you want to run the API on a separate port, use API_PORT
});
