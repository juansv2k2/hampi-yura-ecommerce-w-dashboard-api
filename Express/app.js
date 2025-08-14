// Global imports
const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 3000;

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

// =================== API ROUTES (for Dashboard) ===================

// API Root endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Hampi Yura Express API is running!",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      categories: "/api/categories",
      stats: "/api/stats",
      latest: "/api/products/latest",
    },
  });
});

// Get all products (only active ones) - API
app.get("/api/products", (req, res) => {
  try {
    const products = loadProductsData();
    const activeProducts = products.filter((product) => !product.deleted);
    res.json(activeProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get all categories - API
app.get("/api/categories", (req, res) => {
  try {
    const products = loadProductsData();
    const activeProducts = products.filter((product) => !product.deleted);
    const categories = [
      ...new Set(activeProducts.map((p) => p.category).filter(Boolean)),
    ];

    const categoriesWithCount = categories.map((name, index) => ({
      id: index + 1,
      name,
      productCount: activeProducts.filter((p) => p.category === name).length,
    }));

    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Get dashboard statistics - API
app.get("/api/stats", (req, res) => {
  try {
    const products = loadProductsData();
    const activeProducts = products.filter((product) => !product.deleted);
    const categories = [
      ...new Set(activeProducts.map((p) => p.category).filter(Boolean)),
    ];

    const stats = {
      totalProducts: activeProducts.length,
      totalCategories: categories.length,
      totalUsers: 2, // From SQL file data
      totalRevenue: activeProducts.reduce((sum, p) => sum + (p.price || 0), 0),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// Get latest product - API
app.get("/api/products/latest", (req, res) => {
  try {
    const products = loadProductsData();
    const activeProducts = products.filter((product) => !product.deleted);
    const latestProduct = activeProducts.sort((a, b) => b.id - a.id)[0];

    if (latestProduct) {
      res.json(latestProduct);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest product" });
  }
});

// =================== WEB APPLICATION ROUTES ===================

// Import route modules
const mainRoutes = require("./routes/mainRoutes");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");

// Use route modules
app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

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
  console.log(`🚀 Hampi Yura Server running on port ${port}`);
  console.log(`📱 Web App: http://localhost:${port}`);
  console.log(`🔗 API Docs: http://localhost:${port}/api`);
  console.log(`📊 Dashboard API available at http://localhost:${port}/api/*`);
});
