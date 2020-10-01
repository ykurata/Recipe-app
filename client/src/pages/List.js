import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../actions/recipeActions";
import { getCategories } from "../actions/categoryActions";

import { MDBCol, MDBContainer } from "mdbreact";

import Navbar from "../components/Navbar";
import ListItems from "../components/ListItems";

const List = () => {
  const token = localStorage.getItem("jwtToken");
  const [search, setSearch] = useState("");
  const recipes = useSelector((state) => state.recipe.recipes);
  const loading = useSelector((state) => state.recipe.loading);
  const categories = useSelector(state => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  useEffect(() => {
    dispatch(getCategories(token));
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  let filteredRecipes = recipes.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().indexOf(query) >= 0 ||
      item.ingredients.toLowerCase().indexOf(query) >= 0 ||
      item.category.toLowerCase().indexOf(query) >= 0
    );
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
      <MDBContainer className="search-container">
        <MDBCol lg="6" md="6" xs="12" className="search">
          <select onChange={onChange} className="browser-default custom-select">
            <option>Search by Category</option>
            {options}
          </select>
        </MDBCol>
        <MDBCol lg="6" md="6" xs="12" className="search search-input">
          <input
            className="form-control"
            type="text"
            placeholder="Search by dish name or ingredients..."
            aria-label="Search"
            onChange={onChange}
            value={search}
          />
        </MDBCol>
      </MDBContainer>


      <MDBContainer className="list-container">
        <ListItems data={filteredRecipes} loading={loading} />
      </MDBContainer>
    </div>
  );
};

export default List;
