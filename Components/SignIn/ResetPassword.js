import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = ({ onClose }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
        } else if (password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
        } else {
            setMessage('Your password has been successfully reset!');
            // Call the API to reset the password (replace with actual logic)
        }
    };

    return (
        <div className="reset-password-modal">
            <h2>Reset Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                
                <label>Confirm Password:</label>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                
                <button type="submit">Reset Password</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default ResetPassword;
