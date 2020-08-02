import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Moment from 'react-moment';

import { 
  MDBCard,
  MDBCardBody, 
  MDBCardImage, 
  MDBCardTitle, 
  MDBCardText, 
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdbreact';

import Navbar from "../components/Navbar";
import ListItems from "../components/ListItems";

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

  return (
    <div>
      <Navbar/>

      <MDBContainer fulid="true" id="profile-detail">
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
          <MDBContainer>
            <ListItems data={recipes} />
          </MDBContainer>  
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProfileDetail;