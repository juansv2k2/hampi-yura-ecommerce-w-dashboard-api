const API_BASE = "http://localhost:3001/api";

class ApiService {
  // Get all products
  static async getProducts() {
    try {
      const response = await fetch(`${API_BASE}/products`);
      const products = await response.json();
      return products.filter((product) => !product.deleted);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  // Get all categories
  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  // Get latest product
  static async getLatestProduct() {
    try {
      const response = await fetch(`${API_BASE}/products/latest`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching latest product:", error);
      return null;
    }
  }

  // Get dashboard statistics
  static async getStats() {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching stats:", error);
      return {
        totalProducts: 0,
        totalCategories: 0,
        totalUsers: 0,
        totalRevenue: 0,
      };
    }
  }
}

export default ApiService;
