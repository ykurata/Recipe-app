import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

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
} from 'mdbreact';

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setIsWideEnough] = useState(false);
  const [user, setUser] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  
  const onClick = () => {
    setCollapse(!collapse);
  };
  
  useEffect(() => {
    axios.get(`/profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div>
      <MDBNavbar className="navbar" color="default-color" dark expand="md" fixed="top">
        <MDBNavbarBrand href="/">
          <strong>My Recipes</strong>
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
              <MDBNavLink to="/my-recipes">My Recipes</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  {token && user ?
                    <img
                      src={user.photo}
                      alt=""
                      className="rounded-circle img-fluid nav-avatar"
                    />
                  :  
                    <MDBIcon icon="user" />
                  }
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  {token ? 
                    <div>
                      <MDBDropdownItem href="/Profile">Profile</MDBDropdownItem>
                      <MDBDropdownItem href="/logout" onClick={handleLogout}>Log Out</MDBDropdownItem>
                    </div>
                    : 
                    <div>
                      <MDBDropdownItem href="/login">Log in</MDBDropdownItem>
                      <MDBDropdownItem href="/signup">Sign Up</MDBDropdownItem>
                    </div>
                  }
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
}

export default Navbar;