import React, { useState } from "react";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
        collapsed ? "toggled" : ""
      }`}
      id="accordionSidebar"
    >
      {/* Enhanced Sidebar Brand with Natural Design */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-seedling"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Hampi Yura</div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-chart-line"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Gestión de Productos</div>

      {/* Nav Item - Products */}
      <li className="nav-item">
        <a className="nav-link" href="/products">
          <i className="fas fa-fw fa-leaf"></i>
          <span>Productos</span>
        </a>
      </li>

      {/* Nav Item - Categories */}
      <li className="nav-item">
        <a className="nav-link" href="/categories">
          <i className="fas fa-fw fa-spa"></i>
          <span>Categorías</span>
        </a>
      </li>

      {/* Nav Item - Inventory */}
      <li className="nav-item">
        <a className="nav-link" href="/inventory">
          <i className="fas fa-fw fa-warehouse"></i>
          <span>Inventario</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Gestión de Clientes</div>

      {/* Nav Item - Users */}
      <li className="nav-item">
        <a className="nav-link" href="/users">
          <i className="fas fa-fw fa-users"></i>
          <span>Usuarios</span>
        </a>
      </li>

      {/* Nav Item - Orders */}
      <li className="nav-item">
        <a className="nav-link" href="/orders">
          <i className="fas fa-fw fa-shopping-bag"></i>
          <span>Pedidos</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Análisis</div>

      {/* Nav Item - Reports */}
      <li className="nav-item">
        <a className="nav-link" href="/reports">
          <i className="fas fa-fw fa-chart-pie"></i>
          <span>Reportes</span>
        </a>
      </li>

      {/* Nav Item - Analytics */}
      <li className="nav-item">
        <a className="nav-link" href="/analytics">
          <i className="fas fa-fw fa-analytics"></i>
          <span>Analíticas</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Sitio Web</div>

      {/* Nav Item - View Website */}
      <li className="nav-item">
        <a
          className="nav-link"
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-fw fa-external-link-alt"></i>
          <span>Ver Sitio Web</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0 bg-gradient-natural text-earth"
          id="sidebarToggle"
          onClick={toggleSidebar}
          style={{
            width: "2rem",
            height: "2rem",
            border: "none",
            outline: "none",
          }}
        >
          <i className="fas fa-angle-left"></i>
        </button>
      </div>
    </ul>
  );
};

export default SideBar;
