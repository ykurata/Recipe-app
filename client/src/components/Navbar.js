import React, { useState } from 'react';
import { 
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
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
                    <div className="d-none d-md-inline">Dropdown</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
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