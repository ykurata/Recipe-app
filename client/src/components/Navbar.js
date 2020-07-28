import React, { useState } from 'react';
import { 
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon, 
  MDBNavbar, 
  MDBNavbarBrand, 
  MDBNavbarNav, 
  MDBNavbarToggler, 
  MDBCollapse, 
  MDBNavItem, 
  MDBNavLink, 
  MDBContainer, 
  MDBMask, 
  MDBView } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setIsWideEnough] = useState(false);
  
  const onClick = () => {
    setCollapse(!collapse);
  }

  return (
    <div>
      <Router>
        <MDBNavbar color="default-color" dark expand="md" fixed="top">
          <MDBNavbarBrand href="/">
            <strong>Navbar</strong>
          </MDBNavbarBrand>
          {!isWideEnough && <MDBNavbarToggler onClick={onClick} />}
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to="/list">Search</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/create">Create</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/muy-recipes">My Recipes</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                      alt=""
                      className="rounded-circle img-fluid md-avatar"
                    />
                    {/* <MDBIcon icon="user" /> */}
                    {/* <div className="d-none d-md-inline">Dropdown</div> */}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="/Profile">Profile</MDBDropdownItem>
                    <MDBDropdownItem href="/logout">Log Out</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    </div>
  );
}

export default Navbar;