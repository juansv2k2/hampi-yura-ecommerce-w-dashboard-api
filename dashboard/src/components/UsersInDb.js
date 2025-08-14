import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/users";

const UsersInDb = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user form state
  const [form, setForm] = useState({
    fullName: "",
    birthdate: "",
    email: "",
    password: "",
    admin: false,
  });
  const [avatar, setAvatar] = useState(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("birthdate", form.birthdate);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("admin", form.admin);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error adding user");
      }
      
      setForm({ 
        fullName: "", 
        birthdate: "", 
        email: "", 
        password: "", 
        admin: false 
      });
      setAvatar(null);
      fetchUsers();
    } catch (err) {
      setError(err.message || "No se pudo agregar el usuario");
    }
    setAdding(false);
  };

  const handleDelete = async (id, userEmail) => {
    // Prevent deleting main admin
    if (userEmail === "admin@hampiyura.com") {
      alert("No se puede eliminar el usuario administrador principal");
      return;
    }
    
    if (!window.confirm("¿Eliminar este usuario?")) return;
    
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error deleting user");
      }
      fetchUsers();
    } catch (err) {
      alert(err.message || "No se pudo eliminar el usuario");
    }
  };

  if (loading) {
    return <div className="text-center loading">Loading users...</div>;
  }

  return (
    <div>
      <form
        className="mb-4"
        onSubmit={handleAdd}
        style={{ background: "#f1e4d8", padding: 16, borderRadius: 8 }}
        encType="multipart/form-data"
      >
        <h5>Agregar Usuario</h5>
        <div className="row mb-3">
          <div className="col">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleInput}
              className="form-control"
              placeholder="Nombre Completo"
              required
            />
          </div>
          <div className="col">
            <input
              name="birthdate"
              value={form.birthdate}
              onChange={handleInput}
              className="form-control"
              placeholder="Fecha de Nacimiento"
              type="date"
              required
            />
          </div>
          <div className="col">
            <input
              name="email"
              value={form.email}
              onChange={handleInput}
              className="form-control"
              placeholder="Email"
              type="email"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="password"
              value={form.password}
              onChange={handleInput}
              className="form-control"
              placeholder="Contraseña"
              type="password"
              required
            />
          </div>
          <div className="col">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="form-control"
            />
          </div>
          <div className="col">
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="admin"
                checked={form.admin}
                onChange={handleInput}
                id="adminCheck"
              />
              <label className="form-check-label" htmlFor="adminCheck">
                Administrador
              </label>
            </div>
          </div>
          <div className="col-auto">
            <button className="btn btn-success" type="submit" disabled={adding}>
              {adding ? "Agregando..." : "Agregar"}
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
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha Nacimiento</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.avatar && (
                    <img 
                      src={`http://localhost:3000/images/avatars/${user.avatar}`}
                      alt="avatar"
                      style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.birthdate}</td>
                <td>
                  <span className={`badge ${user.admin ? "bg-success" : "bg-secondary"}`}>
                    {user.admin ? "Sí" : "No"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id, user.email)}
                    disabled={user.email === "admin@hampiyura.com"}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center text-muted">No users found</div>
        )}
      </div>
    </div>
  );
};

export default UsersInDb;
