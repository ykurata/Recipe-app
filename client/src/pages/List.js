import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

import Navbar from "../components/Navbar"
import ListItems from "../components/ListItems";

const List = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios.get('/recipes/list', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setRecipes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <MDBContainer className="list-container">
        <ListItems data={recipes} />
      </MDBContainer>
    </div>
  );
}

export default List;