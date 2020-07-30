import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  MDBBtn,
  MDBContainer,
  MDBRow, 
  MDBCol,
  MDBIcon,
} from 'mdbreact';

import Navbar from "./Navbar";

const Form  = (props) => {
  const [userInput, setUserInput] = useState({
    name: "",
    estimatedTime: "",
    ingredients: "",
    steps: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const token = localStorage.getItem("jwtToken");
    
  const onChange = e => {
    setUserInput({
      ...setUserInput,
      [e.target.name]: e.target.value 
    });
  }
  
  const onSubmit = e => {
    e.preventDefault();

    axios.post("/recipes", userInput, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        console.log(res.data)
        toast.success("Created a recipe!" , {
          position: "top-right",
          autoClose: 2000
        }); 
        window.location = `/image/${res.data._id}`;
      })
      .catch(err => {
        setValidationErrors(err.response.data);
      });
  }

  return (
    <div>
      <Navbar/>
      <MDBContainer id="form">
        <MDBRow>
          <MDBCol md="12">
            <form onSubmit={onSubmit}>
              <p className="h4 text-center mb-4">Create Recipe</p>
              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                Recipe name
              </label>
              {validationErrors ? 
                <p className="error">{validationErrors.name}</p>
              : null}
              <input 
                name="name"
                value={userInput.name} 
                onChange={onChange} 
                type="text" 
                id="defaultFormContactNameEx" 
                className="form-control" 
              />
              <br />
              <label htmlFor="defaultFormContactEmailEx" className="grey-text">
                Estimated Time
              </label>
              {validationErrors ? 
                <p className="error">{validationErrors.estimatedTime}</p>
              : null}
              <input 
                name="time"
                value={userInput.time}
                onChange={onChange}
                type="number" 
                id="defaultFormContactEmailEx" 
                className="form-control" 
                placeholder="min"
              />
              <br />
              <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
                Ingredients
              </label>
              {validationErrors ? 
                <p className="error">{validationErrors.ingredients}</p>
              : null}
              <textarea 
                name="ingredients" 
                value={userInput.ingredients} 
                onChange={onChange} 
                type="text" 
                id="ingredients" 
                className="form-control" 
                rows="3"
              />
              <br />
              <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                Steps
              </label>
              {validationErrors ? 
                <p className="error">{validationErrors.steps}</p>
              : null}
              <textarea 
                name="steps" 
                value={userInput.steps} 
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
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>    
  );
}

export default Form;