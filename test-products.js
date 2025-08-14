const productService = require("./Express/services/productService");

console.log("Testing productService...");
const products = productService.findAll();
console.log(`Found ${products.length} products:`);
products.forEach((p) => {
  console.log(`- ID: ${p.id}, Name: ${p.name}, Deleted: ${p.deleted}`);
});

const testProduct = products.find((p) => p.name.includes("test 1"));
if (testProduct) {
  console.log("\n✅ Found test 1 product:", testProduct);
} else {
  console.log("\n❌ Could not find test 1 product");
}
