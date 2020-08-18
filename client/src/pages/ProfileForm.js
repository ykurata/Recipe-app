import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postAvatar, createProfile, updateProfile } from '../actions/profileActions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  MDBBtn,
  MDBContainer,
  MDBRow, 
  MDBCol,
  MDBIcon,
} from 'mdbreact';

import Navbar from "../components/Navbar";

const ProfileForm = (props) => {
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState(null);
  const [sendImage, setSendImage] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState("");
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const error = useSelector(state => state.errors);
  const loading = useSelector(state => state.profile.loading);
  
  const onChange = e => {
    setDescription(e.target.value);
  }
  
  const imageChange = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setSendImage(e.target.files[0]);
  };

  useEffect(() => {
    axios.get(`/profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        if (res.data === null) {
          setEmpty(true);
        }
        setProfile(res.data);
        setImage(res.data.photo);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Submit profile photo
  const submitPhoto = e => {
    e.preventDefault();
    
    if (sendImage === null) {
      setImageError("Please select an image");
    }
    const formData = new FormData();
    formData.append("photo", sendImage);
    
    dispatch(postAvatar(formData, token));
  }

  
  // Create and update profile description
  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      description: description
    }
   
    if (empty === true) {
      dispatch(createProfile(userId, data, token));
    } else {
      dispatch(updateProfile(userId, data, token));
    };
  }

  return (
    <div> 
      <Navbar/>
      <MDBContainer id="profile-form">
        <MDBRow>
          <MDBCol md="12">
            <h2 className="heading">Edit Profile</h2>
          </MDBCol>
          <MDBCol md="12" lg="6">
            <form onSubmit={submitPhoto}>
              {image !== null && image !== undefined ? 
                <div className="image-div">
                  <img 
                    src={image} 
                    alt=""
                    className="rounded-circle img-fluid image"
                  />
                </div>
              : <div className="avatar-div">
                  <MDBIcon icon="user-alt" size="5x" className="default-avatar" />
                </div>
              }  
                {error ? 
                  <div><label className="error">{imageError}</label></div>
                : null}
                <label className="btn btn-outline-info select">
                  Select Image
                  <input
                    type="file"
                    name="image"
                    hidden
                    onChange={imageChange}
                  />
                </label>
            
              <ToastContainer />
              {loading === false ? 
                <div className="text-center select">
                  <MDBBtn type="submit">Send the Image</MDBBtn>
                </div> 
              : <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              }
            </form>
          </MDBCol>
          <MDBCol md="12" lg="6">
            <form className="text-center" onSubmit={handleSubmit}>
              {error ? 
                <p className="error">{error.description}</p>
              : null}
              {profile !== null ? 
                <textarea onChange={onChange}  value={profile.description} className="form-control mb-4" name="description" id="description" rows="5" placeholder="Write about yourself..."></textarea>
              : <textarea onChange={onChange} value={description} className="form-control mb-4" name="description" id="description" rows="5" placeholder="Write about yourself..."></textarea>
              }
              
              <ToastContainer />
              <MDBBtn type="submit">Submit</MDBBtn>
              <MDBBtn outline href="/" >Cancel</MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProfileForm;