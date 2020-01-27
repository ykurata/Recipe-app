import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name")
    };
  }

  handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };
  
  render() {
    let buttons;

    if (this.state.name) {
      buttons = <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="#about">Recipes</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#skills">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#projects">Sign Up</a>
                    </li>
                  </ul>
                </div>
    } else {
      buttons = <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="#about">Recipes</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#skills">Create</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#projects">Log Out</a>
                    </li>
                  </ul>
                </div>
    }

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-info fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">My Recipes<i className="fas fa-utensils"></i></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
          <span className="navbar-toggler-icon"></span>
        </button>
        {buttons}
      </div>
    </nav>
    );
  }
}

export default Navbar;