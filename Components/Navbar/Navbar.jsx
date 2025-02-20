import React, { useEffect, useState } from 'react';
import './navbar.css';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import SignIn from '../SignIn/SignIn'; // Adjust path as necessary
import SignUp from '../SignUp/SignUp';
import { FaHome, FaInfoCircle, FaPhoneAlt, FaSuitcase, FaUser, FaUserPlus } from 'react-icons/fa'; // Import additional icons

const Navbar = () => {
    const [active, setActive] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize navigate function

    // Check login state on component mount
    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            setIsLoggedIn(true); // User is logged in if token exists
        }
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const showNav = () => {
        setActive('navbar activeNavbar');
    };

    const removeNavbar = () => {
        setActive('navbar');
    };

    const handleSignIn = () => {
        setIsLoggedIn(true); // Set logged in state to true
        setIsModalOpen(false); // Close the sign-in modal
    };

    const handleSignOut = () => {
        // Clear user-related data and log out the user
        localStorage.removeItem('jwt_token'); // Remove JWT token from localStorage
        setIsLoggedIn(false); // Update login state
        navigate('/'); // Optionally navigate to home page after sign out
    };

    const handleNavbarBookNow = () => {
        navigate('/booking'); // Navigate to the booking route
    };

    return (
        <section className={`navbarsection ${isScrolled ? 'scrolled' : ''}`}>
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <h1><MdOutlineTravelExplore className="icon" /> Travel</h1>
                    </Link>
                </div>
                <div className={active}>
                    <ul className="navlists flex">
                        <li className="navItem">
                            <Link to="/" className="navlink">
                                <FaHome className="navIcon" /> Home
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="packages" className="navlink">
                                <FaSuitcase className="navIcon" /> Packages
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/about" className="navlink">
                                <FaInfoCircle className="navIcon" /> About
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/contact" className="navlink">
                                <FaPhoneAlt className="navIcon" /> Contact
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/tours" className="navlink">
                                <FaSuitcase className="navIcon" /> Tours
                            </Link>
                        </li>
                        <li className="navItem">
                            {isLoggedIn ? (
                                <Link to="#" className="navlink" onClick={handleSignOut}>Sign Out</Link> // SignOut button
                            ) : (
                                <>
                                    <Link to="#" className="navlink" onClick={() => setIsModalOpen(true)}>
                                        <FaUser className="navIcon" /> SignIn
                                    </Link>
                                    <Link to="#" className="navlink" onClick={() => setIsSignUpModalOpen(true)}>
                                        <FaUserPlus className="navIcon" /> SignUp
                                    </Link>
                                </>
                            )}
                        </li>
                        <button onClick={handleNavbarBookNow}>Book Now</button>
                    </ul>
                    <div className='closeNavbar' onClick={removeNavbar}>
                        <AiFillCloseCircle className='icon' />
                    </div>
                    <div onClick={showNav} className="toggleNavbar">
                        <TbGridDots className='icon' />
                    </div>
                </div>
            </header>
            {isModalOpen && <SignIn onClose={() => setIsModalOpen(false)} onSignIn={handleSignIn} />}
            {isSignUpModalOpen && <SignUp onClose={() => setIsSignUpModalOpen(false)} />}
        </section>
    );
};

export default Navbar;
