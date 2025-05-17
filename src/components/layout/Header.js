import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import './menu.css';

// Optional: If you need Font Awesome in React, install it via npm
// OR use link in public/index.html (see note below)

const Header = () => {

  const toggleMenu = () => {
    const menu = document.getElementById("myTopnav");
    if (menu.className === "topnav") {
      menu.className += " responsive";
    } else {
      menu.className = "topnav";
    }
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 navbar-brand d-flex justify-content-between align-items-center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ color: 'lightgreen', fontSize: '30px', margin: 0 }}>
              Student Management System
            </h1>
          </Link>
        </div>

        <div className="topnav" id="myTopnav">
          <Link to="/" className="active">Home</Link>
          <Link to="/studentlanding">Student List 1</Link>
          <Link to="/student">Student List 2</Link>
          {/* <Link to="/studentadd">Add Student</Link> */}
          {/* <Link to="/familyadd">Add Family Member</Link> */}
          <button
            onClick={toggleMenu}
            className="icon"
            style={{ fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            &#9776;
          </button>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
