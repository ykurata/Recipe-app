import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../actions/profileActions";
import { logoutUser } from "../actions/authActions";
import { createCategory } from "../actions/categoryActions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [category, setCategory] = useState({ title: "" });
  const error = useSelector((state) => state.errors);

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

  const onChange = (e) => {
    setCategory({ title: e.target.value });
  };

  // Create a new category
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(category, token));
    setCategory({ title: "" });
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
                  <form onSubmit={handleSubmit}>
                    <MDBModalHeader toggle={toggle}>
                      Create Category
                    </MDBModalHeader>
                    <MDBModalBody>
                      <div className="form-group">
                        <label htmlFor="example1">Category Name</label>
                        {error ? <p className="error">{error.title}</p> : null}
                        <input
                          type="text"
                          id="category"
                          name="category"
                          className="form-control form-control-lg"
                          value={category.title}
                          onChange={onChange}
                        />
                      </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn type="submit" color="primary">
                        Save
                    </MDBBtn>
                      <ToastContainer />
                    </MDBModalFooter>
                  </form>
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
