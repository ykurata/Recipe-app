import React from 'react';
import '../App.css';
import landing from '../images/recipe-app-landing2.jpg';

const Landing = () => {

    return (
        <div className="Landing" style={{backgroundImage: `url(${landing})` }}>
            {/* <div className="Landing-content">
                <h1>Pineapples</h1>
                <p>They are good</p>
            </div> */}
        </div>
    );

};

export default Landing;