import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyRecipes } from '../actions/recipeActions';

import { MDBContainer } from 'mdbreact';

import Navbar from "../components/Navbar"
import ListItems from "../components/ListItems";

const MyRecipes = (props) => {
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipe.recipes);

  useEffect(() => {
    dispatch(getMyRecipes(token));
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