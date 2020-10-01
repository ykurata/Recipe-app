import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRecipe } from "../actions/recipeActions";
import { getCategories } from "../actions/categoryActions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

import Navbar from "../components/Navbar";

const Form = (props) => {
  const [userInput, setUserInput] = useState({
    name: "",
    category: "",
    estimatedTime: "",
    ingredients: "",
    steps: "",
  });
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const categories = useSelector(state => state.category.categories);

  useEffect(() => {
    dispatch(getCategories(token));
  }, []);

  const onChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipe(userInput, token));
  };

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
      <MDBContainer id="form">
        <MDBRow>
          <MDBCol md="12">
            <form onSubmit={onSubmit}>
              <p className="h4 text-center mb-4">Create Recipe</p>
              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                Recipe name
              </label>
              {errors ? <p className="error">{errors.name}</p> : null}
              <input
                name="name"
                onChange={onChange}
                type="text"
                id="name"
                className="form-control"
              />
              <br />
              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                Category
              </label>
              {errors ? <p className="error">{errors.category}</p> : null}
              <select name="category" onChange={onChange} className="browser-default custom-select mb-4">
                {options}
              </select>
              <br />
              <label htmlFor="defaultFormContactEmailEx" className="grey-text">
                Estimated Time
              </label>
              {errors ? <p className="error">{errors.estimatedTime}</p> : null}
              <input
                name="estimatedTime"
                onChange={onChange}
                type="number"
                id="estimatedTime"
                className="form-control"
                placeholder="min"
              />
              <br />
              <label
                htmlFor="defaultFormContactSubjectEx"
                className="grey-text"
              >
                Ingredients
              </label>
              {errors ? <p className="error">{errors.ingredients}</p> : null}
              <textarea
                name="ingredients"
                onChange={onChange}
                type="text"
                id="ingredients"
                className="form-control"
                rows="3"
              />
              <br />
              <label
                htmlFor="defaultFormContactMessageEx"
                className="grey-text"
              >
                Steps
              </label>
              {errors ? <p className="error">{errors.steps}</p> : null}
              <textarea
                name="steps"
                onChange={onChange}
                type="text"
                id="steps"
                className="form-control"
                rows="5"
              />
              <div className="text-center mt-4">
                <MDBBtn type="submit">
                  Submit
                  <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
                <ToastContainer />
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Form;
