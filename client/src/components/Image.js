import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";

const Image = (props) => {
	const [image, setImage] = useState(null);
	const [sendImage, setSendImage] = useState(null);
	const [error, setError] = useState("");

	const imageChange = e => {
    setSendImage(e.target.files[0]);
		setImage(URL.createObjectURL(e.target.files[0]));
	}
	
	const onSubmit = e => {
		e.preventDefault();

		if (sendImage === null) {
			setError("Please select an image");
		} else {
			const formData = new FormData();
			formData.append("recipeImage", sendImage);

			axios.post(`/recieps/image/${props.params.match.id}`, formData, { headers: { Authorization: `Bearer ${this.state.token}` }})
				.then(res => {
					toast.success("Posted an image!" , {
						position: "top-right",
						autoClose: 2000
					}); 
				})
				.catch(err => {
					console.log(err);
				});	
		}
	}

	return (
		<div id="image">
			<Navbar/>
			<div className="main container">
				<div className="col-12 text-center">
					<h2 className="heading">Recipe Image</h2>
				</div>
				<form onSubmit={onSubmit}>
					<div className="card">
						<div className="card-body text-center">
							{error ? 
                  <p className="image-error">{error}</p>
                : null
							}
							{sendImage ? 
								<img src={image} alt="..." class="img-thumbnail" />
							: 
								<div className="no-image text-center">
									<i className="far fa-image fa-5x"></i>
								</div>
							}
              <div className="container text-center">
								<label className="btn btn-outline-info">
									Select Image
									<input
										type="file"
										name="file1"
										onChange={imageChange}
										hidden
									/>
								</label>
							</div>
							<div className="container text-center">
								<button type="submit" className="btn btn-info">Submit</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div> 	
	);
}

export default Image;