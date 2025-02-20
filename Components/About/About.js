// About.js
import React from 'react';
import './About.css'; // Optional: Import CSS for styling
import video3 from '../../Assests/video3.mp4'; // Ensure the path is correct
import { Link } from 'react-router-dom'; // Import Link
import Footer from '../Footer/Footer';

const About = () => {
    return (
        <div className="aboutSection">
            <div className='videoDiv'>
                <video 
                    src={video3} 
                    loop 
                    autoPlay 
                    muted 
                    type="video/mp4" // Corrected video type
                />
                <div className='overlay'>
                    <h3>About Us</h3>
                    <p>Welcome to our travel website!! We are dedicated to helping you explore India.</p>
                    <p>Our team is passionate about travel and aims to provide you with the best resources and tips to make your journey unforgettable.</p>
                    <p>Join us as we discover new destinations, share travel stories, and connect with fellow travelers.</p>
                    <p>Thank you for visiting our site!...:)</p>
                    <h3>"Our mission is to inspire and empower travelers to explore the beauty of India..."</h3>
                    {/* Home button */}
                    <Link to="/" className="homeButton">Home</Link>
                </div>
            </div>
        </div>
    );
};

export default About;
