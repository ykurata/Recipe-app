import React, { useState, useEffect } from 'react';
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

import Navbar from "../components/Navbar";

const Update  = (props) => {
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
      ...userInput,
      [e.target.name]: e.target.value 
    });
  }

  useEffect(() => {
    axios.get(`/recipes/get/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      setUserInput({
        name: res.data.name,
        estimatedTime: res.data.estimatedTime.toString(),
        ingredients: res.data.ingredients,
        steps: res.data.steps
      })
    })
    .catch(err => {
      console.log(err);
    });
  }, []);


  const onSubmit = e => {
    e.preventDefault();
  
    axios.put(`/recipes/update/${props.match.params.id}`, userInput, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        toast.success("Successfully Updated!" , {
          position: "top-right",
          autoClose: 3000
        }); 
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
              <p className="h4 text-center mb-4">Update Recipe</p>
              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                Recipe name
              </label>
              {validationErrors ? 
                <p className="error">{validationErrors.name}</p>
              : null}
              <input 
                name="name"
                onChange={onChange} 
                type="text" 
                id="name" 
                className="form-control" 
                value={userInput.name}
              />
              <br />
              <label htmlFor="defaultFormContactEmailEx" className="grey-text">
                Estimated Time
              </label>
              {validationErrors ? 
                <p className="error">{validationErrors.estimatedTime}</p>
              : null}
              <input 
                name="estimatedTime"
                onChange={onChange} 
                type="number" 
                id="estimatedTime" 
                className="form-control" 
                placeholder="min"
                value={userInput.estimatedTime}
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
                onChange={onChange} 
                type="text" 
                id="ingredients" 
                className="form-control" 
                rows="3"
                value={userInput.ingredients}
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
                onChange={onChange} 
                type="text" 
                id="steps" 
                className="form-control" 
                rows="5" 
                value={userInput.steps}
              />
              <div className="text-center mt-4">
                <MDBBtn type="submit">
                  Submit
                  <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
                <ToastContainer/>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>    
  );
}

export default Update;