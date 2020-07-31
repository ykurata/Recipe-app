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
import Navbar from "./Navbar"

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

  let recipe;
  recipe = recipes.map((item, index) => (
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
      <MDBContainer className="list-container">
        <MDBRow>
          {recipe}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default List;