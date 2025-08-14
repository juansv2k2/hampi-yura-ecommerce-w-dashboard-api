// Hampi Yura API server (runs on port 3001)

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const API_PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/images/product-images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// Load and save products data functions
const dataPath = path.join(__dirname, "database/productsDataBase.json");
const loadProductsData = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading products data:", error);
    return [];
  }
};
const saveProductsData = (products) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error saving products data:", error);
    return false;
  }
};
// Add a new product (with optional image upload)
app.post("/api/products", upload.single("image"), (req, res) => {
  console.log("POST /api/products called");
  console.log("Body:", req.body);
  console.log("File:", req.file);

  try {
    const products = loadProductsData();
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    let imageFile = req.file
      ? req.file.filename
      : req.body.image || "default-image.png";
    const newProduct = {
      id: newId,
      name: req.body.name,
      price: parseFloat(req.body.price) || 0,
      category: req.body.category,
      stock: parseInt(req.body.stock) || 0,
      image: imageFile,
      deleted: false,
    };
    products.push(newProduct);
    if (saveProductsData(products)) {
      console.log("Product added successfully:", newProduct);
      res.status(201).json(newProduct);
    } else {
      res.status(500).json({ error: "Failed to save product" });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Delete a product (soft delete)
app.delete("/api/products/:id", (req, res) => {
  try {
    const products = loadProductsData();
    const id = parseInt(req.params.id);
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Product not found" });
    }
    products[idx].deleted = true;
    if (saveProductsData(products)) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to delete product" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

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

// 404 handler for API
app.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

app.listen(API_PORT, () => {
  console.log(`🚀 Hampi Yura API running on port ${API_PORT}`);
  console.log(`🔗 API Docs: http://localhost:${API_PORT}/api`);
});
