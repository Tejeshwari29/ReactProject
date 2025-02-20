import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './home.css';
import video from '../../Assests/video.mp4';
import { FaArrowRight } from 'react-icons/fa';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const Home = () => {
    const [isSignedIn, setIsSignedIn] = useState(false); // Track user sign-in status
    const navigate = useNavigate(); // Initialize navigate function

    // Check user authentication status
    useEffect(() => {
        const userToken = localStorage.getItem('userToken'); // Replace with real authentication logic if available
        setIsSignedIn(!!userToken); // Set sign-in state based on token presence
    }, []);

    // Handle "Get Started" button click
    const handleGetStartedClick = () => {
        if (!isSignedIn) {
            alert("Please Sign In to continue.");
        } else {
            navigate('/packages'); // Navigate to packages page if signed in
        }
    };

    return (
        <section className="home">
            <video src={video} muted autoPlay loop type="video/mp4"></video>
            <div className="overlay">
                <div className="homeContent container">
                    <div className="textDiv">
                        <span className="smallText">Our Packages</span>
                        <h1 className="homeTitle">Search Your Holiday......</h1>
                        <button
                            className="getStartedBtn"
                            onClick={isSignedIn ? () => navigate('/packages') : handleGetStartedClick}
                        >
                            {isSignedIn ? 'View Packages' : 'Get Started'} <FaArrowRight className="arrowIcon" />
                        </button>
                    </div>
                </div>
            </div>
            <Main />
            <Footer />
        </section>
    );
};

export default Home;
