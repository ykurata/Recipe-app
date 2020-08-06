import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipesByUserId } from '../actions/recipeActions';

import { MDBContainer } from 'mdbreact';

import Navbar from "../components/Navbar"
import ListItems from "../components/ListItems";

const MyRecipes = (props) => {
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipe.recipes);

  useEffect(() => {
    dispatch(getRecipesByUserId(token));
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

export default MyRecipes;