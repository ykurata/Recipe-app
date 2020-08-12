import React, { useEffect } from 'react';
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
  MDBRow,
  MDBIcon
} from 'mdbreact';

import Navbar from "../components/Navbar";
import ListItems from "../components/ListItems";

const ProfileDetail = (props) => {
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);
  const recipes = useSelector(state => state.recipe.recipes);
  const username = useSelector(state => state.recipe.username);

  useEffect(() => {
    dispatch(getProfile(props.match.params.id, token));
  }, []);
  
  useEffect(() => {
    dispatch(getRecipesByUserId(props.match.params.id, token));
  }, []);

  return (
    <div>
      <Navbar/>
      <MDBContainer fulid="true" id="profile-detail">
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="profile-card">
              <MDBCardBody>
                {profile !== null && profile.photo !== undefined ? 
                  <img 
                    src={profile.photo} 
                    alt=""
                    className="rounded-circle img-fluid image"
                  />
                : <div className="avatar-div">
                    <MDBIcon icon="user-alt" size="5x" className="default-avatar" />
                  </div>
                }
                <MDBCardTitle>
                  {username}
                </MDBCardTitle>
                {profile !== null ?
                  <div>
                    <p>Joined <Moment format="MMMM YYYY">{profile.createdAt}</Moment></p> 
                    <MDBCardText>{profile.description}</MDBCardText>
                  </div>
                : null }
                
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