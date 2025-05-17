import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import './menu.css'
import './menu.js'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const Header = (props) => {
  // const { token, setToken, username, setUserName } = props;

  // const handleLogout = () => {
  //   setToken('');
  //   setUserName('');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');
  // };

  return (
    <Fragment>
      <nav className="navbar row">
        <div style={{ clear: 'both' }}>
          <div className="col-8 col-md-6 mt-2 mt-md-0 navbar-brand" style={{ width: '60%', float: 'left' }}>
            <Link to="/"><h1 style={{ color: 'lightgreen', fontSize: '45px' }}>Student Management System</h1></Link>
          </div>
          <div className="col-4 col-md-3 mt-4 mt-md-0 text-center" style={{ width: '40%', float: 'left' }}>
            {/* <span className="ml-1" id="cart_count" style={{ padding: '10px' }}>Welcome: {username}</span>&nbsp;<span id="cart" className="ml-3">{token && <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}</span> */}
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div className="topnav" id="myTopnav">
          <Link to="/" className="active">Home</Link>
          <Link to="/studentlanding">Student List 1</Link>
          <Link to="/student">Student List 2</Link>
          {/* <Link to="/studentadd">Add Student</Link>
          <Link to="/familyadd">Add Family Member</Link>
          <Link to="/familyedit/1">Edit Family Member</Link> */}

          {/* <div className="dropdown">
            <button className="dropbtn">Student
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/studentlist">Student List</Link>
              <Link to="/studentadd">Add Student</Link>
              <Link to="#">Link 3</Link>
            </div>
          </div> */}
          <a href="javascript:void(0);" style={{ fontSize: '15px' }} className="icon" onclick="myFunction()">&#9776;</a>
        </div>
      </nav>

      <div style={{ clear: 'both' }}></div>
      {/* <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav> */}
    </Fragment>
  )
};
export default Header