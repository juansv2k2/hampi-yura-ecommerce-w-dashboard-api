const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

// Show cart
router.get("/", authMiddleware, cartController.list);

// Add product to cart
router.post("/add/:id", authMiddleware, cartController.add);
router.get("/add/:id", authMiddleware, cartController.add);

// Update cart item quantity
router.put("/update/:id", authMiddleware, cartController.update);
router.post("/update/:id", authMiddleware, cartController.update);

// Remove product from cart
router.delete("/remove/:id", authMiddleware, cartController.remove);
router.post("/remove/:id", authMiddleware, cartController.remove);

// Process checkout
router.post("/checkout", authMiddleware, cartController.checkout);
router.put("/comprar", authMiddleware, cartController.checkout);

module.exports = router;
