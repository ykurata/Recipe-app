import React from 'react';
import '../App.css';
import landing from '../images/recipe-app-landing2.jpg';

const Landing = () => {
    return (
        <div className="Landing" style={{backgroundImage: `url(${landing})` }}>
        </div>
    );

};

export default Landing;