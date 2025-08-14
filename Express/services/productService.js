const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(
  __dirname,
  "../database/productsDataBase.json"
);

const productService = {
  // Load products fresh from file each time
  loadProducts() {
    try {
      return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    } catch (error) {
      console.error("Error loading products:", error);
      return [];
    }
  },

  findAll() {
    const products = this.loadProducts();
    const filteredProducts = products.filter((product) => {
      return !product.deleted;
    });
    return filteredProducts;
  },

  //   filtro los que estan borrados, y luego by category que solicito
  filterByCategory(category) {
    return this.findAll().filter((product) => {
      return product.category == category;
    });
  },

  findByPk(id) {
    const products = this.loadProducts();
    const product = products.find((product) => {
      return product.id == id;
    });
    return product;
  },

  create(payload, image) {
    const products = this.loadProducts();
    const lastProduct = products[products.length - 1];
    const biggestProductId = products.length > 0 ? lastProduct.id : 1;
    const product = {
      ...payload,
      id: biggestProductId + 1,
      price: Number(payload.price),
      image: image ? image.filename : "default-product.png",
      deleted: false,
    };
    products.push(product);
    this.save(products);
  },

  editOne(id, payload, image) {
    const products = this.loadProducts();
    const product = products.find((p) => p.id == id);
    if (product) {
      product.name = payload.name;
      product.price = Number(payload.price);
      product.discount = Number(payload.discount);
      product.category = payload.category;
      product.description = payload.description;
      product.image = image ? image.filename : product.image;
      this.save(products);
    }
  },

  destroyOne(id) {
    const products = this.loadProducts();
    const product = products.find((p) => p.id == id);
    if (product) {
      product.deleted = true;
      this.save(products);
    }
  },

  save(products) {
    const jsonString = JSON.stringify(products, null, 4);
    fs.writeFileSync(productsFilePath, jsonString);
  },
};

module.exports = productService;
