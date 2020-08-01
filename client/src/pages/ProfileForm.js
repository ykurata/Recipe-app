import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  MDBBtn,
  MDBContainer,
  MDBRow, 
  MDBCol,
  MDBCard, 
  MDBCardBody, 
  MDBIcon,
} from 'mdbreact';

import Navbar from "../components/Navbar";

const ProfileForm = (props) => {
  const [image, setImage] = useState(null);
  const [sendImage, setSendImage] = useState(null);
  const [profil, setProfile] = useState({});
  const [empty, setEmpty] = useState(false);
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  const onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  const imageChange = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setSendImage(e.target.files[0]);
  };

  useEffect(() => {
    axios.get(`/profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        if (res.data) {
          setProfile(res.data);
          setDescription(res.data.description);
          setImage(res.data.photo);
        } else {
          setEmpty(true)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [])


  const handleSubmit = e => {
    e.preventDefault();
   
    if (empty === true) {
      axios.post(`/profile/${userId}`, description, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        toast.success("Created!" , {
          position: "top-right",
          autoClose: 2000
        });
      })
      .catch(err => {
        setValidationError(err.response.data);
        console.log(err.response.data);
      });
    } else {
      axios.put(`/profile/update/${userId}`, description, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        toast.success("Updated!" , {
          position: "top-right",
          autoClose: 2000
        });
      })
      .catch(err => {
        setValidationError(err.response.data);
        console.log(err.response);
      });
    }
  }

  const submitPhoto = e => {
    e.preventDefault();

    if (sendImage === null) {
      setError("Please select an image");
    }
    const formData = new FormData();
    formData.append("photo", sendImage);
  
    axios.post("/profile/photo", formData, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Successfully Sent a Photo!" , {
        position: "top-right",
        autoClose: 2000
      }); 
    })
    .catch(err => {
      console.log(err.response.data);
    });
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
              {image ? 
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
                  <div><label className="error">{error}</label></div>
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
              <div className="text-center select">
                <MDBBtn type="submit">Send the Image</MDBBtn>
              </div> 
            </form>
          </MDBCol>
          <MDBCol md="12" lg="6">
            <form className="text-center" onSubmit={handleSubmit}>
              {validationError ? 
                <p className="error">{validationError.description}</p>
              : null}
              <textarea onChange={onChange}  value={description} className="form-control mb-4" name="description" id="description" rows="5" placeholder="Write about yourself..."></textarea>
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