// API service to fetch data from local JSON file
// Ready for backend integration when API server is available

class ApiService {
  // Get all products
  static async getProducts() {
    try {
      // Primary: Use local JSON file (reliable)
      const response = await fetch("/productsDataBase.json");
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
      // Calculate categories from products
      const products = await this.getProducts();
      const categories = [
        ...new Set(products.map((p) => p.category).filter(Boolean)),
      ];
      return categories.map((name, index) => ({
        id: index + 1,
        name,
        productCount: products.filter((p) => p.category === name).length,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  // Get latest product
  static async getLatestProduct() {
    try {
      // Calculate from products
      const products = await this.getProducts();
      return products.sort((a, b) => b.id - a.id)[0] || null;
    } catch (error) {
      console.error("Error fetching latest product:", error);
      return null;
    }
  }

  // Get dashboard statistics
  static async getStats() {
    try {
      // Calculate stats from local data
      const products = await this.getProducts();
      const categories = await this.getCategories();

      return {
        totalProducts: products.length,
        totalCategories: categories.length,
        totalUsers: 2,
        totalRevenue: products.reduce((sum, p) => sum + (p.price || 0), 0),
      };
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
