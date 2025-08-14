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
      {/* Enhanced Add Product Form */}
      <div className="card mb-4 border-left-info">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-info">
            <i className="fas fa-box mr-2"></i>
            Agregar Nuevo Producto
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleAdd} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Nombre del Producto *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="Ingresa el nombre del producto"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Precio *
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleInput}
                    className="form-control"
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Stock
                </label>
                <input
                  name="stock"
                  value={form.stock}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="Cantidad"
                  type="number"
                  min="0"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Categoría *
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="Ej: Fitoterapia, Suplementos, etc."
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Imagen del Producto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-6 mb-3">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    {error}
                  </div>
                )}
              </div>
              <div className="col-md-6 mb-3 text-right">
                <button
                  className="btn btn-info btn-lg px-4"
                  type="submit"
                  disabled={adding}
                >
                  <i className="fas fa-plus-circle mr-2"></i>
                  {adding ? "Agregando..." : "Agregar Producto"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Enhanced Products Table */}
      <div className="card border-left-warning">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-warning">
            <i className="fas fa-boxes mr-2"></i>
            Lista de Productos ({products.length})
          </h6>
        </div>
        <div className="card-body">
          <div
            className="table-responsive"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              overflowX: "auto",
              border: "1px solid #dee2e6",
              borderRadius: "0.25rem",
            }}
          >
            <table
              className="table table-bordered mb-0"
              style={{ minWidth: "700px" }}
            >
              <thead className="bg-gray-50 sticky-top">
                <tr>
                  <th className="text-center">ID</th>
                  <th>Nombre</th>
                  <th className="text-center">Precio</th>
                  <th className="text-center">Categoría</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="text-center font-weight-bold">
                      {product.id}
                    </td>
                    <td className="font-weight-bold">{product.name}</td>
                    <td className="text-center">
                      <span className="badge badge-success px-3 py-2">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-info px-3 py-2">
                        {product.category || "Sin categoría"}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge badge-${
                          product.stock > 10
                            ? "success"
                            : product.stock > 0
                            ? "warning"
                            : "danger"
                        } px-3 py-2`}
                      >
                        {product.stock || 0} unidades
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                        title="Eliminar producto"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center text-muted py-4">
                <i className="fas fa-boxes fa-3x text-gray-300 mb-3"></i>
                <p className="text-gray-500">No hay productos registrados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInDb;
