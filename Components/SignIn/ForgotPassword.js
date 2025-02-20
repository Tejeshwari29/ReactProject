import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (email) {
            setMessage('A password reset link has been sent to your email!');
            // Simulate API call to send password reset link (replace with actual logic)
        } else {
            setMessage('Please enter a valid email address.');
        }
    };

    return (
        <div className="forgot-password-modal">
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Send Reset Link</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
