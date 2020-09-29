import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../actions/profileActions";
import { logoutUser } from "../actions/authActions";

import logo from "../images/logo.jpg";

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
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setIsWideEnough] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.loginUserProfle);
  const isAdmin = useSelector((state) => state.profile.isAdmin);
  const [modal, setModal] = useState(false);

  const onClick = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const toggle = (e) => {
    setModal(!modal);
  };

  return (
    <div>
      <MDBNavbar
        className="navbar"
        color="default-color"
        dark
        expand="md"
        fixed="top"
      >
        <MDBNavbarBrand href="/">
          <strong>My Recipes</strong>
          <img src={logo}></img>
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
            {isAdmin === true ? (
              <MDBNavItem>
                <MDBNavLink onClick={toggle} to="#">
                  Create Category
                </MDBNavLink>
                <MDBModal isOpen={modal} toggle={toggle} centered>
                  <MDBModalHeader toggle={toggle}>
                    MDBModal title
                  </MDBModalHeader>
                  <MDBModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>
                      Close
                    </MDBBtn>
                    <MDBBtn color="primary">Save changes</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </MDBNavItem>
            ) : null}
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  {token && user ? (
                    <img
                      src={user.photo}
                      alt=""
                      className="rounded-circle img-fluid nav-avatar"
                    />
                  ) : (
                    <MDBIcon icon="user" />
                  )}
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  {token ? (
                    <div>
                      <MDBDropdownItem href="/Profile">Profile</MDBDropdownItem>
                      <MDBDropdownItem href="/logout" onClick={handleLogout}>
                        Log Out
                      </MDBDropdownItem>
                    </div>
                  ) : (
                    <div>
                      <MDBDropdownItem href="/login">Log in</MDBDropdownItem>
                      <MDBDropdownItem href="/signup">Sign Up</MDBDropdownItem>
                    </div>
                  )}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
};

export default Navbar;
