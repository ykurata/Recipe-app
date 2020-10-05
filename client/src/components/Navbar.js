import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../actions/profileActions";
import { logoutUser, getLoginUser } from "../actions/authActions";
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
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.loginUserProfle);
  const loginUser = useSelector(state => state.auth.loginUser);
  const [modal, setModal] = useState(false);
  const [profileModal, setprofileModal] = useState(false);
  const [category, setCategory] = useState({ title: "" });
  const error = useSelector((state) => state.errors);

  const onClick = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, []);

  useEffect(() => {
    dispatch(getLoginUser(userId));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const toggle = (e) => {
    setModal(!modal);
  };

  const profileToggle = e => {
    setprofileModal(!profileModal);
  }

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
            {loginUser && loginUser.isAdmin === true ? (
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
              <MDBModal isOpen={profileModal} toggle={profileToggle} centered>
                <MDBModalHeader toggle={profileToggle}>MDBModal title</MDBModalHeader>
                <MDBModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                        </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={profileToggle}>Close</MDBBtn>
                  <MDBBtn color="primary">Save changes</MDBBtn>
                </MDBModalFooter>
              </MDBModal>
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
                      <MDBDropdownItem href="#" onClick={profileToggle}>Profile</MDBDropdownItem>
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
