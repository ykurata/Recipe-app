import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      userid: "",
      username: "",
      review: "",
      likes: "",
      reviews: [],
      reviewLength: "",
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      error: "",
      show: false,
      showButton: false
    };
    this.sendLike = this.sendLike.bind(this);
  }

  componentDidMount() {
    this.getRecipe();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  getRecipe() {
    axios.get(`/recipes/get/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      this.setState({
        recipe: res.data,
        likes: res.data.likes.length,
        reviews: res.data.reviews,
        reviewLength: res.data.reviews.length,
        userid: res.data.userId._id,
        username:res.data.userId.name
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  sendLike()  {
    axios.put(`/recipes/like/${this.props.match.params.id}`, this.state.userId, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        toast.success("You sent a Like!" , {
          position: "top-right",
          autoClose: 10000
        }); 
        axios.get(`/recipes/get/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
          .then(res => {
            this.setState({
              likes: res.data.likes.length
            })
          })
          .catch(err => {
            console.log(err);
          }); 
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error
        });
      });
  };

  deleteRecipe() {
    axios.delete(`/recipes/delete/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      toast.success("Successfully deleted!" , {
        position: "top-right",
        autoClose: 10000
      }); 
    })
    .catch(err => {
      console.log(err.response.data);
    })
  };
  
  // Display text input field by click
  showInput = e =>  {
    e.preventDefault();
    this.setState({ show: true });
  };

  // Display review submit button
  showButton = e => {
    e.preventDefault();
    this.setState({ showButton: true });
  };

  sendReview = e => {
    e.preventDefault();
    const newReview = {
      text: this.state.review
    }

    axios.put(`/recipes/review/${this.props.match.params.id}`, newReview, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        toast.success("Successfully Submitted!" , {
          position: "top-right",
          autoClose: 10000
        }); 
        axios.get(`/recipes/get/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
          .then(res => {
            this.setState({
              recipe: res.data,
              reviews: res.data.reviews,
              reviewLength: res.data.reviews.length
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 10000
        });
      });
      this.setState({ review: "" });
  };

  render() {
    const { recipe } = this.state;
    const { reviews } = this.state;

    return (
      <div>
        <Navbar></Navbar>

        <div id="detail" className="main container-fluid padding">
          <div className="inner-div">
            <div className="col-12 text-center">
              <h2 className="heading">{recipe.name}</h2>
              <p>Created by {this.state.username}</p>
            </div>
          
            <div className="row padding">
              <div className="col-md-12 col-lg-6">
                <div className="image text-center">
                  <img src={recipe.recipeImage} className="img-thumbnail img-fluid" alt="Recipe" />
                </div>
              </div>
              <div className="col-md-12 col-lg-6 text-center">
                <div className="content">
                  <h5>Ingredients</h5>
                  <div className="card">
                    <div className="card-body text-left">
                      {recipe.ingredients}
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h5>Steps</h5>
                  <div className="card">
                    <div className="card-body text-left">
                      {recipe.steps}
                    </div>
                  </div>
                </div>

                {/* Display Update & Delete buttons only for a user who created the recipe */}
                {this.state.userId === this.state.userid ?
                  <div className="button-div">
                    <ToastContainer />
                    <a href={`/update/${recipe._id}`} type="button" className="btn btn-info">Update</a>
                    <button 
                      type="button" 
                      className="delete btn btn-outline-info"
                      onClick={(e) => { if (window.confirm('Are you sure you want to delete this recipe?')) this.deleteRecipe() } }
                    >
                      Delete
                    </button>
                  </div>
                : null  
                }
                
                {/* Display Like & Write a Review buttons  */}
                {this.state.userId !== this.state.userid ?
                  <div className="button-div text-center">
                      <ToastContainer />
                      <span className="likes-num">{this.state.likes}</span><i className="fas fa-heart icon" onClick={this.sendLike} type="button">Like</i>
                      <i className="fas fa-pen icon reviewIcon" onClick={this.showInput}>Write a Review</i>
                      {this.state.error ?
                        <p className="error">{this.state.error}</p>
                      : null  
                      }
                  </div>
                : null  
                }
              </div>
            </div>
            
            {/* Review input field */}
            {this.state.show === true ?
              <div className="col-12 text-center review">
                <form onSubmit={this.sendReview}>
                  <ToastContainer />
                  <textarea onChange={this.onChange} onClick={this.showButton} type="text" name="review" id="review" className="form-control" rows="2"></textarea>
                  {/* Show submit button by clicking textarea */}
                  {this.state.showButton === true ?
                    <button type="submit" className="review-button btn btn-info">Submit</button>
                  : null  
                  }
                </form>
              </div>
            : null  
            }
            
            {/* Display reviews */}
            {this.state.reviewLength !== 0 ? 
              <div className="col-12 review">
                <h5 className="title-review">Reviews ({this.state.reviewLength}) </h5>
                {reviews.map((item, i) => 
                  <div className="card" key={i}>
                    <div className="card-review">
                      <span className="reviewer-name">{item.user.name} <Moment format="MM/DD/YYYY">{item.createdAt}</Moment></span><br></br>
                      {item.text}
                    </div>
                  </div>
                )}
              </div>
            : null  
            }
          </div>
        </div>  
      </div>
    );
  };
}

export default Detail;