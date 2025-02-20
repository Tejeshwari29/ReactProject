import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import './SignUp.css';

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password, mobileNumber } = formData;
  
    // Basic validation
    if (!name || !lastName || !email || !password || !mobileNumber) {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      setLoading(true);
  
      // Send the sign-up data to the backend using Axios
      const response = await axios.post('http://localhost:5271/api/signup/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Response status:", response.status); // Log the response status
      console.log("Response data:", response.data); // Log the response data
  
      if (response.status === 201) {
        setError('');
        console.log('User registered successfully');
        
        // Assuming the backend returns a JWT token upon successful sign-up
        const { token, user } = response.data;
        
        // Store JWT token in localStorage
        localStorage.setItem('token', token);  // Store JWT in localStorage
  
        // Optionally, you can also store the user data or any other info
        localStorage.setItem('user', JSON.stringify(user));  // Store user data in localStorage
  
        // Close the modal after successful registration
        onClose();
      }
    } catch (err) {
      console.error('Error during sign-up:', err);
  
      // Log the entire error object to inspect it
      if (err.response) {
        // Check if there's a response and log the status and data
        console.log('Error Response Status:', err.response.status);
        console.log('Error Response Data:', err.response.data);
        setError(err.response.data.message || 'Error during sign-up');
      } else {
        // If no response exists, log the error message
        setError('Error during sign-up');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="signup-modal">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

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

        <label>Mobile Number:</label>
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default SignUp;
