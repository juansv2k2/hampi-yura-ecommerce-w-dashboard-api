import React from "react";

function TopBar() {
  return (
    <React.Fragment>
      {/*<!-- Enhanced Topbar with Natural Design -->*/}
      <nav className="navbar navbar-expand navbar-light bg-hampi-natural shadow-natural mb-4 page-header hampi-accent">
        <div className="container-fluid">
          {/*<!-- Topbar Brand with Natural Styling -->*/}
          <div className="navbar-brand">
            <h1 className="h3 mb-0 page-title">
              <i className="fas fa-seedling text-success mr-2 stats-icon"></i>
              Hampi Yura Dashboard
            </h1>
          </div>

          {/*<!-- Topbar Navbar with Enhanced Styling -->*/}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="nav-link d-flex align-items-center">
                <div className="rounded-circle bg-gradient-natural p-2 shadow-natural">
                  <i className="fas fa-user-circle fa-lg text-earth"></i>
                </div>
                <span className="ml-3 d-none d-lg-inline text-earth font-weight-bold">
                  Panel de Administración
                </span>
              </span>
            </li>
          </ul>
        </div>
      </nav>
      {/*<!-- End of Enhanced Topbar -->*/}
    </React.Fragment>
  );
}
export default TopBar;
