import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../actions/profileActions';
import { getRecipesByUserId } from '../actions/recipeActions';
import Moment from 'react-moment';

import { 
  MDBCard,
  MDBCardBody, 
  MDBCardTitle, 
  MDBCardText, 
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdbreact';

import Navbar from "../components/Navbar";
import ListItems from "../components/ListItems";

const ProfileDetail = (props) => {
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);
  const username = useSelector(state => state.profile.username);
  const recipes = useSelector(state => state.recipe.recipes);
  
  useEffect(() => {
    dispatch(getProfile(userId, token));
  }, []);
  
  useEffect(() => {
    dispatch(getRecipesByUserId(token));
  }, []);

  return (
    <div>
      <Navbar/>

      <MDBContainer fulid="true" id="profile-detail">
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="profile-card">
              <MDBCardBody>
                <img 
                  src={profile.photo} 
                  alt=""
                  className="rounded-circle img-fluid image"
                />
                <MDBCardTitle>
                  {username}
                </MDBCardTitle>
                <p>Joined <Moment format="MMMM YYYY">{profile.createdAt}</Moment></p> 
                <MDBCardText>{profile.description}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="12" className="user-recipe">
            <h4>{username}' s Recipes</h4>
          </MDBCol>
          <MDBContainer>
            <ListItems data={recipes} />
          </MDBContainer>  
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProfileDetail;