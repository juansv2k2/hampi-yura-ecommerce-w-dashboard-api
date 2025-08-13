import React from 'react';
import foto from '../assets/images/logo1.png';

function TopBar(){
    return (
      <React.Fragment>
        {/*<!-- Topbar -->*/}
        <nav className="navbar navbar-expand navbar-light static-top ">
          {/*<!-- Sidebar Toggle (Topbar) 
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>
		  -->*/}

          {/*<!-- Topbar Navbar -->*/}
          <div className="text-center w-100 bg-hampi-crema">
            <div className="w-100 p-5 ">
              <img
                className="img-profile rounded-circle"
                src={foto}
                alt="Hampi Yura - Administrador"
                width="150px"
              />
            </div>
          </div>
        </nav>
        {/*<!-- End of Topbar -->*/}
      </React.Fragment>
    );
}
export default TopBar;