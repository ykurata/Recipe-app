import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { submitRecipeImage, getRecipe } from '../actions/recipeActions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow, 
  MDBCol,
  MDBIcon,
} from 'mdbreact';

import Navbar from "../components/Navbar";

const Image = (props) => {
	const [image, setImage] = useState(null);
	const [sendImage, setSendImage] = useState(null);
	const [error, setError] = useState("");
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();

	const imageChange = e => {
    setSendImage(e.target.files[0]);
		setImage(URL.createObjectURL(e.target.files[0]));
  }
  
  // GET a recipe
  useEffect(() => {
    axios.get(`/recipes/get/${props.match.params.id}`)
    .then(res => {
      setImage(res.data.recipeImage);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  
	const onSubmit = e => {
		e.preventDefault();

		if (sendImage === null) {
			setError("Please select an image");
		} else {
			const formData = new FormData();
			formData.append("recipeImage", sendImage);
      dispatch(submitRecipeImage(props.match.params.id, formData, token));
		}
	}

	return (
		<div>
			<Navbar/>
			<MDBContainer id="image">
        <MDBRow>
          <MDBCol>
            <form onSubmit={onSubmit}>
              <p className="h4 text-center mb-4">Recipe Image</p>
              <MDBCard className="card">
                <MDBCardBody className="text-center">
                  {error ? 
                      <p className="image-error">{error}</p>
                    : null
                  }
                  {image ? 
                    <img src={image} alt="..." className="img-thumbnail" />
                  : 
                    <div className="no-image text-center">
                      <i className="far fa-image fa-5x"></i>
                    </div>
                  }
                  <MDBContainer className="text-center">
                    <label className="btn btn-outline-info">
                      Select Image
                      <input
                        type="file"
                        name="file1"
                        onChange={imageChange}
                        hidden
                      />
                    </label>
                  </MDBContainer>
                  <MDBContainer className="container text-center">
                    <MDBBtn type="submit">
                      Submit
                      <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                  </MDBContainer>
                  <ToastContainer/>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
		  </MDBContainer>
		</div> 	
	);
}

export default Image;