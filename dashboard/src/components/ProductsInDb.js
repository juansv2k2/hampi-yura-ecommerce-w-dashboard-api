import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/products";

const ProductsInDb = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product form state

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", parseFloat(form.price));
      formData.append("category", form.category);
      formData.append("stock", parseInt(form.stock) || 0);
      if (image) formData.append("image", image);

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error adding product");
      setForm({ name: "", price: "", category: "", stock: "" });
      setImage(null);
      fetchProducts();
    } catch (err) {
      setError("No se pudo agregar el producto");
    }
    setAdding(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      alert("No se pudo eliminar el producto");
    }
  };

  if (loading) {
    return <div className="text-center loading">Loading products...</div>;
  }

  return (
    <div>
      <form
        className="mb-4"
        onSubmit={handleAdd}
        style={{ background: "#f1e4d8", padding: 16, borderRadius: 8 }}
        encType="multipart/form-data"
      >
        <h5>Agregar producto</h5>
        <div className="row">
          <div className="col">
            <input
              name="name"
              value={form.name}
              onChange={handleInput}
              className="form-control"
              placeholder="Nombre"
              required
            />
          </div>
          <div className="col">
            <input
              name="price"
              value={form.price}
              onChange={handleInput}
              className="form-control"
              placeholder="Precio"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="col">
            <input
              name="category"
              value={form.category}
              onChange={handleInput}
              className="form-control"
              placeholder="Categoría"
              required
            />
          </div>
          <div className="col">
            <input
              name="stock"
              value={form.stock}
              onChange={handleInput}
              className="form-control"
              placeholder="Stock"
              type="number"
              min="0"
            />
          </div>
          <div className="col">
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="form-control"
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-success" type="submit" disabled={adding}>
              Agregar
            </button>
          </div>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category || "N/A"}</td>
                <td>{product.stock || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center text-muted">No products found</div>
        )}
      </div>
    </div>
  );
};

export default ProductsInDb;
