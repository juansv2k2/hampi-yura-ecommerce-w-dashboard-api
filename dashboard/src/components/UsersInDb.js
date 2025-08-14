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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
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
        admin: false,
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
      {/* Enhanced Add User Form */}
      <div className="card mb-4 border-left-success">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-success">
            <i className="fas fa-user-plus mr-2"></i>
            Agregar Nuevo Usuario
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleAdd} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Nombre Completo *
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="Ingresa el nombre completo"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Email *
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="usuario@ejemplo.com"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Fecha de Nacimiento *
                </label>
                <input
                  name="birthdate"
                  value={form.birthdate}
                  onChange={handleInput}
                  className="form-control"
                  type="date"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Contraseña *
                </label>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="Mínimo 6 caracteres"
                  type="password"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label text-gray-800 font-weight-bold">
                  Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-6 mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="admin"
                    checked={form.admin}
                    onChange={handleInput}
                    id="adminCheck"
                  />
                  <label
                    className="form-check-label text-gray-800 font-weight-bold"
                    htmlFor="adminCheck"
                  >
                    <i className="fas fa-crown mr-1 text-warning"></i>
                    Privilegios de Administrador
                  </label>
                </div>
              </div>
              <div className="col-md-6 mb-3 text-right">
                <button
                  className="btn btn-success btn-lg px-4"
                  type="submit"
                  disabled={adding}
                >
                  <i className="fas fa-plus-circle mr-2"></i>
                  {adding ? "Agregando..." : "Agregar Usuario"}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Enhanced Users Table */}
      <div className="card border-left-primary">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            <i className="fas fa-users mr-2"></i>
            Lista de Usuarios ({users.length})
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
              style={{ minWidth: "800px" }}
            >
              <thead className="bg-gray-50 sticky-top">
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Avatar</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th className="text-center">Fecha Nacimiento</th>
                  <th className="text-center">Admin</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-center font-weight-bold">{user.id}</td>
                    <td className="text-center">
                      {user.avatar ? (
                        <img
                          src={`http://localhost:3000/images/avatars/${user.avatar}`}
                          alt="avatar"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #dee2e6",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: "#f8f9fa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                          }}
                        >
                          <i className="fas fa-user text-gray-400"></i>
                        </div>
                      )}
                    </td>
                    <td className="font-weight-bold">{user.fullName}</td>
                    <td>{user.email}</td>
                    <td className="text-center">{user.birthdate}</td>
                    <td className="text-center">
                      <span
                        className={`badge badge-${
                          user.admin ? "success" : "secondary"
                        } px-3 py-2`}
                      >
                        {user.admin ? (
                          <>
                            <i className="fas fa-crown mr-1"></i>
                            Admin
                          </>
                        ) : (
                          <>
                            <i className="fas fa-user mr-1"></i>
                            Usuario
                          </>
                        )}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id, user.email)}
                        disabled={user.email === "admin@hampiyura.com"}
                        title={
                          user.email === "admin@hampiyura.com"
                            ? "No se puede eliminar el usuario principal"
                            : "Eliminar usuario"
                        }
                      >
                        <i className="fas fa-trash mr-1"></i>
                        {user.email === "admin@hampiyura.com"
                          ? "Protegido"
                          : "Eliminar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center text-muted py-4">
                <i className="fas fa-users fa-3x text-gray-300 mb-3"></i>
                <p className="text-gray-500">No hay usuarios registrados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersInDb;
