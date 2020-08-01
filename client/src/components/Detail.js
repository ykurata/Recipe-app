import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  MDBBtn,
  MDBContainer,
  MDBRow, 
  MDBCol,
  MDBCard, 
  MDBCardBody, 
} from 'mdbreact';

import Navbar from "./Navbar";

const Detail = (props) => {
  const [recipe, setRecipe] = useState({});
  const [recipeUserId, setRecipeUserId] = useState("");
  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");
  const [likes, setLikes] = useState("");
  const [reviews, setReviews] = useState([]);
  const token =  localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [expanded, setExpended] = useState(false);


  const onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  // GET a recipe
  useEffect(() => {
    axios.get(`/recipes/get/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      console.log(res.data)
      setRecipe(res.data);
      setRecipeUserId(res.data.userId._id);
      setUsername(res.data.userId.name);
      reviews(res.data.reviews);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  // Send a like 
  const sendLike = () => {
    axios.put(`/recipes/like/${props.match.params.id}`, userId, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        toast.success("You sent a Like!" , {
          position: "top-right",
          autoClose: 2000
        }); 
        axios.get(`/recipes/get/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` }})
          .then(res => {
            setLikes(res.data.likes.length);
          })
          .catch(err => {
            console.log(err);
          }); 
      })
      .catch(err => {
        setError(err.response.data.error);
      });
  };
  
  // DELETE a recipe
  const deleteRecipe = () => {
    axios.delete(`/recipes/delete/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Successfully deleted!" , {
        position: "top-right",
        autoClose: 2000
      }); 
      window.location = "/my-recipes";
    })
    .catch(err => {
      console.log(err.response.data);
    })
  };
  
  // Display text input field by clicking a button
  const showInput = e =>  {
    e.preventDefault();
    setShow(true);
  };

  // Display review submit button by clicking a textarea
  const displayButton = e => {
    e.preventDefault();
    setShowButton(true);
  };
  
  // Post a review 
  const sendReview = e => {
    e.preventDefault();
    const newReview = {
      text: review
    }

    axios.put(`/recipes/review/${props.match.params.id}`, newReview, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        toast.success("Sent a Review!" , {
          position: "top-right",
          autoClose: 2000
        }); 
        axios.get(`/recipes/get/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` }})
          .then(res => {
            setRecipe(res.data);
            setReviews(res.data.reviews);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        setReviewError(err.response.data.error);
      });
      setReview("");
  };

  const showMore = () => {
    setItemsToShow(itemsToShow + 5);
  }
  
  return (
    <div> 
      <Navbar></Navbar>
      
      <MDBContainer id="detail">
        <MDBRow>
          <MDBCol md="12" className="text-center">
            <h2>{recipe.name}</h2>
            <p>Created By <Link to={`/profile/${recipeUserId}`} id={recipeUserId}>{username}</Link></p>
          </MDBCol>
          <MDBRow>
            <MDBCol md="12" lg="6">
              <img src={recipe.recipeImage} className="img-thumbnail img-fluid" alt="Recipe" />
              <h6 className="time">Estimated Time {recipe.estimatedTime} min</h6>
            </MDBCol>
            <MDBCol md="12" lg="6">
              <MDBContainer className="detail-content">
                <h5>Ingredients</h5>
                <MDBCard>
                  <MDBCardBody>
                    {recipe.ingredients}
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
              <MDBContainer className="detail-content">
                <h5>Steps</h5>
                <MDBCard>
                  <MDBCardBody>
                    {recipe.steps}
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>

              {/* Display Update & Delete buttons only for a user who created the recipe */}
              {userId === recipeUserId ?
                <MDBContainer className="button-div">
                  <ToastContainer />
                  <MDBBtn
                    href={`/update/${recipe._id}`}
                  >
                    Update
                  </MDBBtn>
                  <MDBBtn 
                    outline
                    type="button" 
                    className="delete"
                    onClick={(e) => { if (window.confirm('Are you sure you want to delete this recipe?')) deleteRecipe() } }
                  >
                    Delete
                  </MDBBtn>
                </MDBContainer>
              : null  
              }
              
              {/* Display Like & Write a Review buttons  */}
              {userId !== recipeUserId ?
                <MDBContainer className="button-div text-center">
                    <ToastContainer />
                    <span className="likes-num">{likes}</span><i className="fas fa-heart icon" onClick={sendLike} type="button">Like</i>
                    <i className="fas fa-pen icon reviewIcon" onClick={showInput}>Write a Review</i>
                    {error ?
                      <p className="error">{error}</p>
                    : null  
                    }
                </MDBContainer>
              : null  
              }
              
            </MDBCol>
          </MDBRow>
          
          {/* Review input field */}
          {show === true ? (
            <MDBCol md="12" className="text-center review">
              <form onSubmit={sendReview}>
                <textarea onChange={onChange} onClick={displayButton} type="text" name="review" id="review" className="form-control" rows="2"></textarea>

                {/* show error message */}
                {reviewError ? (
                  <p className="error">{reviewError}</p>
                ) : (
                  null
                )  
                }
                {/* Show submit button by clicking textarea */}
                {showButton === true ? (
                  <MDBBtn type="submit" className="review-button">Submit</MDBBtn>
                ) : (
                  null  
                )
                }
              </form>
            </MDBCol>
          ) : ( 
            null 
          ) 
          }
          
          {/* Display 5 reviews each*/}
          {reviews !== 0 ? (
            <MDBCol md="12" className="review">
              <h5 className="title-review">Reviews ({reviews.length}) </h5>

              {reviews.slice(0, itemsToShow).map((review, i) => 
                <MDBCard className="card" key={i}>
                  <MDBCardBody className="card-review">
                    <span className="reviewer-name">{review.user.name} <Moment format="MM/DD/YYYY">{review.createdAt}</Moment></span><br></br>
                    {review.text}
                  </MDBCardBody>
                </MDBCard>
              )}
              
              {reviews.length > 5 ? (
                <MDBBtn onClick={showMore} className="review-button">
                  Show More
                </MDBBtn>
              ) : ( 
                null 
              )  
              }
            </MDBCol>
          ):(
            null
          ) 
          }

        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Detail;