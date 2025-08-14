const cartService = require("../services/cartService");
const productService = require("../services/productService");

const cartController = {
  // Show cart page
  list: (req, res) => {
    try {
      const userId = req.session.userLogged.id;
      const cartItems = cartService.getUserCart(userId);

      // Get product details for each cart item
      const cartWithProducts = cartItems.map((item) => {
        const product = productService.findByPk(item.productId);
        return {
          ...item,
          product: product,
        };
      });

      const totalPrice = cartService.getCartTotal(userId);
      const itemCount = cartService.getCartItemCount(userId);

      res.render("Cart", {
        cart: {
          products: cartWithProducts,
          total: totalPrice,
          itemCount: itemCount,
        },
        e: cartWithProducts.length > 0,
      });
    } catch (error) {
      console.error("Error loading cart:", error);
      res.render("Cart", {
        cart: { products: [], total: 0, itemCount: 0 },
        e: false,
      });
    }
  },

  // Add product to cart
  add: (req, res) => {
    try {
      const userId = req.session.userLogged.id;
      const productId = req.params.id;
      const quantity = parseInt(req.body.quantity) || 1;

      // Get product details
      const product = productService.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Add to cart
      cartService.addToCart(userId, productId, quantity, product.price);

      // Redirect back to product page or cart
      if (
        req.headers["content-type"] &&
        req.headers["content-type"].includes("application/json")
      ) {
        return res.json({ success: true, message: "Product added to cart" });
      } else {
        return res.redirect(`/products/${productId}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (
        req.headers["content-type"] &&
        req.headers["content-type"].includes("application/json")
      ) {
        return res.status(500).json({ error: "Failed to add product to cart" });
      } else {
        return res.redirect("/products");
      }
    }
  },

  // Update cart item quantity
  update: (req, res) => {
    try {
      const userId = req.session.userLogged.id;
      const productId = req.params.id;
      const quantity = parseInt(req.body.quantity);

      if (quantity <= 0) {
        cartService.removeFromCart(userId, productId);
      } else {
        cartService.updateCartItem(userId, productId, quantity);
      }

      res.redirect("/carrito");
    } catch (error) {
      console.error("Error updating cart:", error);
      res.redirect("/carrito");
    }
  },

  // Remove item from cart
  remove: (req, res) => {
    try {
      const userId = req.session.userLogged.id;
      const productId = req.params.id;

      cartService.removeFromCart(userId, productId);
      res.redirect("/carrito");
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.redirect("/carrito");
    }
  },

  // Process checkout (simulate purchase)
  checkout: (req, res) => {
    try {
      const userId = req.session.userLogged.id;
      const cartItems = cartService.getUserCart(userId);

      if (cartItems.length === 0) {
        return res.redirect("/carrito");
      }

      // Here you would typically:
      // 1. Process payment
      // 2. Create order record
      // 3. Update product stock
      // 4. Send confirmation email

      // For now, we'll just clear the cart and redirect to a success page
      cartService.clearCart(userId);

      res.render("checkout-success", {
        message: "¡Compra realizada con éxito!",
        user: req.session.userLogged,
      });
    } catch (error) {
      console.error("Error processing checkout:", error);
      res.redirect("/carrito");
    }
  },
};

module.exports = cartController;
