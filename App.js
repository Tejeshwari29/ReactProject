import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';  // Import the Main component
import SignIn from './Components/SignIn/SignIn'; 
import SignUp from './Components/SignUp/SignUp'; 
import { UserContext } from './UserContext';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Tours from './Components/Tours/Tours';
import TourDetails from './Components/Tours/TourDetails';

import Packages from './Components/Packages/Packages';
import Booking from './Components/Booking/Booking';
import Footer from './Components/Footer/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminDashboard from './Components/Admin/AdminDashboard';

function App() {
    const { user, signIn } = useContext(UserContext);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignIn = (username, password) => {
        signIn(username, password);
        setShowSignIn(false);
    };

    const handleOpenSignIn = () => {
        setShowSignIn(true);
    };

    const handleCloseSignIn = () => {
        setShowSignIn(false);
    };

    const handleOpenSignUp = () => {
        setShowSignUp(true);
    };

    const handleCloseSignUp = () => {
        setShowSignUp(false);
    };

    const isAdmin = () => {
        return localStorage.getItem('role') === 'admin';
    };

    return (
        <Router>
            <div className="appContainer">
                <Navbar 
                    onSignInClick={handleOpenSignIn} 
                    onSignUpClick={handleOpenSignUp}
                />

                <Routes>
                    {/* Home route will show the Main component with user reviews */}
                    <Route path="/" element={<Home />} />
                    
                    {/* Main component to show on home page */}
                    <Route path="/home" element={user ? <Main /> : <Navigate to="/" />} />

                    {/* Other routes */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tours" element={<Tours />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/tour-details" element={<TourDetails />} />

                    {/* Admin route, protected by role */}
                    <Route path="/admin-dashboard" element={isAdmin() ? <AdminDashboard /> : <Navigate to="AdminDashboard" />} />
                </Routes>

                {/* Show SignIn and SignUp modals when needed */}
                {showSignIn && <SignIn onClose={handleCloseSignIn} onSignIn={handleSignIn} />}
                {showSignUp && <SignUp onClose={handleCloseSignUp} />}

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
