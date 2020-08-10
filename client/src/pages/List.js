import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../actions/recipeActions';

import { MDBContainer } from 'mdbreact';

import Navbar from "../components/Navbar"
import ListItems from "../components/ListItems";

const List = () => {
  const recipes = useSelector(state => state.recipe.recipes);
  const loading = useSelector(state => state.recipe.loading);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <div>
      <Navbar/>
      <MDBContainer fluid className="list-container">
        <ListItems data={recipes} loading={loading} />    
      </MDBContainer>
    </div>
  );
}

export default List;