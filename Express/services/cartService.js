const path = require("path");
const fs = require("fs");

const cartFilePath = path.join(__dirname, "../database/cart.json");

const cartService = {
  // Load cart data from file
  loadCartData() {
    try {
      if (fs.existsSync(cartFilePath)) {
        return JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));
      }
      return [];
    } catch (error) {
      console.error("Error loading cart data:", error);
      return [];
    }
  },

  // Save cart data to file
  saveCartData(cartData) {
    try {
      const jsonString = JSON.stringify(cartData, null, 4);
      fs.writeFileSync(cartFilePath, jsonString);
    } catch (error) {
      console.error("Error saving cart data:", error);
    }
  },

  // Get user's cart
  getUserCart(userId) {
    const allCarts = this.loadCartData();
    return allCarts.filter((item) => item.userId == userId && !item.deleted);
  },

  // Add item to cart or update quantity if exists
  addToCart(userId, productId, quantity = 1, price) {
    const allCarts = this.loadCartData();
    const existingItem = allCarts.find(
      (item) =>
        item.userId == userId && item.productId == productId && !item.deleted
    );

    if (existingItem) {
      // Update existing item
      existingItem.quantity += quantity;
      existingItem.subTotal = existingItem.quantity * price;
    } else {
      // Add new item
      const newId =
        allCarts.length > 0 ? Math.max(...allCarts.map((c) => c.id)) + 1 : 1;
      const newCartItem = {
        id: newId,
        userId: parseInt(userId),
        productId: parseInt(productId),
        quantity: quantity,
        price: parseFloat(price),
        subTotal: quantity * parseFloat(price),
        deleted: false,
        createdAt: new Date().toISOString(),
      };
      allCarts.push(newCartItem);
    }

    this.saveCartData(allCarts);
    return true;
  },

  // Update item quantity in cart
  updateCartItem(userId, productId, quantity) {
    const allCarts = this.loadCartData();
    const item = allCarts.find(
      (item) =>
        item.userId == userId && item.productId == productId && !item.deleted
    );

    if (item) {
      item.quantity = quantity;
      item.subTotal = item.quantity * item.price;
      this.saveCartData(allCarts);
      return true;
    }
    return false;
  },

  // Remove item from cart (soft delete)
  removeFromCart(userId, productId) {
    const allCarts = this.loadCartData();
    const item = allCarts.find(
      (item) =>
        item.userId == userId && item.productId == productId && !item.deleted
    );

    if (item) {
      item.deleted = true;
      this.saveCartData(allCarts);
      return true;
    }
    return false;
  },

  // Clear user's entire cart
  clearCart(userId) {
    const allCarts = this.loadCartData();
    const userItems = allCarts.filter((item) => item.userId == userId);

    userItems.forEach((item) => {
      item.deleted = true;
    });

    this.saveCartData(allCarts);
    return true;
  },

  // Get cart total for user
  getCartTotal(userId) {
    const userCart = this.getUserCart(userId);
    return userCart.reduce((total, item) => total + item.subTotal, 0);
  },

  // Get cart item count for user
  getCartItemCount(userId) {
    const userCart = this.getUserCart(userId);
    return userCart.reduce((count, item) => count + item.quantity, 0);
  },
};

module.exports = cartService;
