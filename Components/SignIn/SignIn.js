import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import './SignIn.css';
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword modal
import ResetPassword from './ResetPassword'; // Import ResetPassword modal
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onClose, onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to control ForgotPassword modal visibility
  const [showResetPassword, setShowResetPassword] = useState(false); // State to control ResetPassword modal visibility
  const [isAdmin, setIsAdminLogin] = useState(false); // State to toggle between Admin and User login forms

  const [bookings, setBookings] = useState([]); // State for bookings
  const [adminLoading, setAdminLoading] = useState(false); // Loading state for admin dashboard
  const [adminError, setAdminError] = useState(''); // Error state for admin dashboard

  const navigate = useNavigate(); // Initialize navigate for routing

  // Check if the user is already logged in by looking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // If token exists, bypass sign-in and inform the parent component that user is signed in
      onSignIn({ token });
      navigate('/'); // Redirect to home if token exists
    }
  }, [onSignIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);

      if (isAdmin) {
        // Admin credentials check
        if (email === 'tejeshwarigd@gmail.com' && password === 'teju@123') {
          // Manually create token for admin login
          const adminToken = 'admin_specific_token';  // Fake token for admin
          const adminRole = 'admin';
          
          // Save the token and role to localStorage
          localStorage.setItem('jwt_token', adminToken);
          localStorage.setItem('role', adminRole);

          // Fetch bookings for the admin
          fetchBookings(adminToken);

          // Inform parent component of sign-in success
          onSignIn({ token: adminToken, role: adminRole });

          // Redirect to Admin Dashboard
          navigate('/admin-dashboard'); 
          onClose(); // Close the modal
        } else {
          setError('Invalid admin credentials.');
        }
      } else {
        // User login (API call)
        const response = await axios.post(`http://localhost:5271/api/signup/signin`, formData);
        
        if (response.status === 200) {
          setError('');
          const token = response.data.token;
          const role = response.data.role; // Assuming the backend sends role info along with token
          
          // Save the token and role to localStorage
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('role', role); // Store role in localStorage

          // Inform parent component of sign-in success
          onSignIn(response.data);

          // Redirect based on role (user or admin)
          if (role === 'admin') {
            navigate('/admin-dashboard'); // Redirect to Admin Dashboard
          } else {
            navigate('/'); // Redirect to home or user dashboard
          }

          onClose(); // Close the modal
        } else {
          setError('Invalid email or password.');
        }
      }
    } catch (err) {
      setError('Error during sign-in');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async (token) => {
    setAdminLoading(true);
    try {
      // Use GET instead of POST if the API expects it
      const response = await axios.get('http://localhost:5271/api/booking/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Pass the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });
  
      // Set the fetched bookings data
      setBookings(response.data); 
    } catch (err) {
      setAdminError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setAdminLoading(false);
    }
  };
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true); // Show ForgotPassword modal
  };

  const handleResetPasswordClick = () => {
    setShowResetPassword(true); // Show ResetPassword modal
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false); // Close ForgotPassword modal
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false); // Close ResetPassword modal
  };

  const handleAdminLoginClick = () => {
    setIsAdminLogin(true); // Switch to Admin login form
  };

  const handleUserLoginClick = () => {
    setIsAdminLogin(false); // Switch to User login form
  };

  return (
    <div className="signin-modal">
      <h2>Sign In</h2>

      {/* User/Admin login toggle buttons */}
      <div className="login-toggle">
        <button type="button" onClick={handleUserLoginClick} className={!isAdmin ? 'active' : ''}>User Login</button>
        <button type="button" onClick={handleAdminLoginClick} className={isAdmin ? 'active' : ''}>Admin Login</button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Conditionally render the User or Admin login form */}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <button type="button" onClick={onClose}>Close</button>
      </form>

      {/* Forgot Password Link */}
      <div className="auth-links">
        <button type="button" onClick={handleForgotPasswordClick}>Forgot Password?</button>
      </div>

      {/* Show Forgot Password Modal */}
      {showForgotPassword && <ForgotPassword onClose={handleCloseForgotPassword} />}

      {/* Show Reset Password Modal */}
      {showResetPassword && <ResetPassword onClose={handleCloseResetPassword} />}

      {/* Admin Dashboard Booking Table */}
      {isAdmin && (
        <div className="admin-page">
          <h2>Admin Dashboard</h2>

          {adminError && <p className="error">{adminError}</p>}

          {adminLoading ? (
            <p>Loading bookings...</p> // Show loading message while fetching
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Tour</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.tour}</td>
                    <td>₹{booking.price}</td>
                    <td>{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default SignIn;
