import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Moment from 'react-moment';

import { 
  MDBBtn, 
  MDBCard,
  MDBCardBody, 
  MDBCardImage, 
  MDBCardTitle, 
  MDBCardText, 
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdbreact';

import Navbar from "./Navbar";

const ProfileDetail = (props) => {
  const [profile, setProfile] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [empty, setEmpty] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    axios.get(`/profile/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        if (res.data) {
          setProfile(res.data);
          setImage(res.data.photo);
        } else {
          setEmpty(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
  
  useEffect(() => {
    axios.get(`/recipes/userid/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setRecipes(res.data);
        setName(res.data[0].userId.name);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
 

  let userRecipe;
  userRecipe = recipes.map((item, index) => (
    <MDBCol lg="4" md="4" sm="6" key={index}>
      <MDBCard className="recipe-card">
        <MDBCardImage className="img-fluid list-image" src={item.recipeImage}/>
        <MDBCardBody>
          <MDBCardTitle>{item.name}</MDBCardTitle>
          <p>By {item.userId.name}</p>
          <MDBCardText className="ingredients">
            Ingredients: {item.ingredients.replace(/\s/g,' ')}
          </MDBCardText>
          <MDBBtn href={`/${item._id}`}>Detail</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  ));

  return (
    <div>
      <Navbar/>

      <MDBContainer id="profile-detail">
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="profile-card">
              <MDBCardBody>
                <img 
                  src={image} 
                  alt=""
                  className="rounded-circle img-fluid image"
                />
                <MDBCardTitle>
                  {name}
                </MDBCardTitle>
                <p>Joined <Moment format="MMMM YYYY">{profile.createdAt}</Moment></p> 
                <MDBCardText>{profile.description}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="12" className="user-recipe">
            <h4>{name}' s Recipes</h4>
          </MDBCol>
          {userRecipe}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProfileDetail;