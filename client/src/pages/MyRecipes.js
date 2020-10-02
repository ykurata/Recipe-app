import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyRecipes } from '../actions/recipeActions';
import { getCategories } from "../actions/categoryActions";

import {
  MDBCol,
  MDBContainer
} from 'mdbreact';

import Navbar from "../components/Navbar"
import ListItems from "../components/ListItems";

const MyRecipes = (props) => {
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipe.recipes);
  const loading = useSelector(state => state.recipe.loading);
  const categories = useSelector(state => state.category.categories);

  useEffect(() => {
    dispatch(getMyRecipes(token));
  }, []);

  useEffect(() => {
    dispatch(getCategories(token));
  }, []);

  const onChange = e => {
    setSearch(e.target.value);
  }

  // Filter by search input 
  const filteredRecipes = recipes.filter(item => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().indexOf(query) >= 0 ||
      item.ingredients.toLowerCase().indexOf(query) >= 0 ||
      item.category.toLowerCase().indexOf(query) >= 0
    )
  });

  let options;
  if (categories.length > 0) {
    options = categories.map((item, index) =>
      <option key={index} value={item.title}>{item.title}</option>
    )
  } else {
    options = <option>No Options</option>
  }

  return (
    <div>
      <Navbar />
      <MDBContainer className="my-recipe-title">
        <p className="h4 text-center mt-3">My Recipes</p>
      </MDBContainer>
      <MDBContainer className="list-container">
        <ListItems data={filteredRecipes} loading={loading} />
      </MDBContainer>
    </div>
  );
}

export default MyRecipes;