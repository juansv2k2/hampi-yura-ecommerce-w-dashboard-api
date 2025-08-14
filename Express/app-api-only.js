const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Load products data
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

// API Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hampi Yura Express API is running!",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      categories: "/api/categories",
      stats: "/api/stats",
    },
  });
});

// Get all products (only active ones)
app.get("/api/products", (req, res) => {
  try {
    const products = loadProductsData();
    const activeProducts = products.filter((product) => !product.deleted);
    res.json(activeProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get all categories
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

// Get dashboard statistics
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

// Get latest product
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}`);
});
