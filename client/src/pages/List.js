import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../actions/recipeActions";

import { MDBCol, MDBContainer } from "mdbreact";

import Navbar from "../components/Navbar";
import ListItems from "../components/ListItems";

const List = () => {
  const [search, setSearch] = useState("");
  const recipes = useSelector((state) => state.recipe.recipes);
  const loading = useSelector((state) => state.recipe.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter by search input
  const filteredRecipes = recipes.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().indexOf(query) >= 0 ||
      item.ingredients.toLowerCase().indexOf(query) >= 0
    );
  });

  return (
    <div>
      <Navbar />
      <MDBCol md="6" className="search">
        <input
          className="form-control"
          type="text"
          placeholder="Search by dish name or ingredients..."
          aria-label="Search"
          onChange={onChange}
          value={search}
        />
      </MDBCol>
      <MDBContainer className="list-container">
        <ListItems data={filteredRecipes} loading={loading} />
      </MDBContainer>
    </div>
  );
};

export default List;
