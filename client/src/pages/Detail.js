import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getRecipe,
  postReview,
  sendLike,
  deleteRecipe
} from '../actions/recipeActions';

import {Link } from "react-router-dom";
import Moment from 'react-moment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  MDBBtn,
  MDBContainer,
  MDBRow, 
  MDBCol,
  MDBCard, 
  MDBCardBody, 
} from 'mdbreact';

import Navbar from "../components/Navbar";

const Detail = (props) => {
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [expanded, setExpended] = useState(false);
  const recipe = useSelector(state => state.recipe.recipe);
  const reviews = useSelector(state => state.recipe.reviews);
  const likes = useSelector(state => state.recipe.likes);
  const username = useSelector(state => state.recipe.username);
  const recipeUserId = useSelector(state => state.recipe.userId);
  const error = useSelector(state => state.errors.error);
  const dispatch = useDispatch();
  const token =  localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  
  // Handle review input
  const onChange = e => {
    setReview(e.target.value);
  }
  
  // GET a recipe
  useEffect(() => {
    dispatch(getRecipe(props.match.params.id));
  }, []);

  // Send a like 
  const postLike = () => {
    dispatch(sendLike(props.match.params.id, userId, token));
  };
  
  // DELETE a recipe
  const handleDelete = () => {
    dispatch(deleteRecipe(props.match.params.id, token));
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
  
  // Submit a review 
  const sendReview = e => {
    e.preventDefault();
    if (review === "") {
      setReviewError("Please enter a review")
    } else {
      const newReview = {
        text: review
      }
      dispatch(postReview(props.match.params.id, newReview, token));
      setReview("");
    }
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
            <MDBCol md="12" lg="6" className="detail-image">
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
                    style={{color: 'white'}}
                  >
                    Update
                  </MDBBtn>
                  <MDBBtn 
                    outline
                    type="button" 
                    className="delete"
                    onClick={(e) => { if (window.confirm('Are you sure you want to delete this recipe?')) handleDelete() } }
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
                    <span className="likes-num">{likes}</span><i className="fas fa-heart icon" onClick={postLike} type="button">Like</i>
                   
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
          {reviews.length > 0 ? (
            <MDBCol md="12" className="review">
              <h5 className="title-review">Reviews ({reviews.length}) </h5>

              {recipe.reviews.slice(0, itemsToShow).map((review, i) => 
                <MDBCard key={i}>
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