import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  }
  
  useEffect(() => {
    axios.get(`/profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(user)

  return (
    <MDBNavbar className="navbar" color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <a href="/"><strong className="white-text">My Recipes</strong></a>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/list">Search</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/create">Create</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/create">My Recipes</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                {user.photo ? 
                  <img src={user.photo} alt="Avatar" className="md-avatar rounded-circle" />
                : <MDBIcon icon="user" />     
                } 
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
  );
}

export default Navbar;