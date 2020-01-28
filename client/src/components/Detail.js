import React, { Component } from 'react';
import axios from 'axios';

import Navbar from "./Navbar";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      token: localStorage.getItem("jwtToken")
    };
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe() {
    axios.get(`/recipes/get/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      this.setState({
        recipe: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  render() {
    const { recipe } = this.state;

    return (
      <div>
       <Navbar></Navbar>

       <div id="detail" className="container-fluid padding">
        <div className="inner-div">
          <div className="row padding">
            <div className="col-md-12 col-lg-6">
              <div className="title text-center">
                <img src="" className="rounded" alt="No Image" />
              </div>
            </div>
            <div className="col-md-12 col-lg-6 text-center">
              <div className="title">
                <h2>Pizza</h2>
              </div>
              <div className="title text-left">
                <h5>ingredients</h5>
                <p>egg, milk, tomato</p>
              </div>
              
              <div className="title">
                <p>steps</p>
              </div>
            </div>
          </div>
        </div>
      </div>  
      </div>
    );
  };
}

export default Detail;