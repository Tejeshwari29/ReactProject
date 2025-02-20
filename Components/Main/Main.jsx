import React, { useState } from 'react';
import './main.css';
import { FaStar } from 'react-icons/fa';  // For star ratings

// Review data
const reviews = [
    {
        id: 1,
        name: "Bhavana S",
        rating: 5,
        review: "The Taj Mahal was absolutely stunning! The architecture and the details were beyond anything I imagined. A must-see destination for anyone visiting India.",
    },
    {
        id: 2,
        name: "Latha MU",
        rating: 4,
        review: "Hampi is a hidden gem! The temples and ruins are magnificent. It gives you a sense of ancient history. Highly recommend visiting if you love historical places.",
    },
    {
        id: 3,
        name: "Pooja U",
        rating: 5,
        review: "The views from the top of the temples in Hampi were breathtaking. I also loved the peaceful atmosphere of the ruins. Would visit again in a heartbeat!",
    },
    // Add more reviews as necessary
];

const Main = () => {
    // State for handling user feedback
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState(''); // Fixing the missing state

    // Handle the feedback form submission
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        
        // Ensure name and feedback are both filled
        if (name && feedback) {
            setFeedbackMessage(`Thank you, ${name}, for your feedback!`);

            // Reset name and feedback after submission
            setName('');
            setFeedback('');
            
            // Optional: Clear the feedback message after a few seconds
            setTimeout(() => setFeedbackMessage(''), 3000);
        } else {
            setFeedbackMessage('Please provide both your name and feedback.');
        }
    };

    return (
        <section className='main container section'>
            <div className='secTitle'>
                <h3 className='title'>User Reviews:</h3>
            </div>

            <div className='secContent grid'>
                {/* Map over the reviews array to display each review */}
                {reviews.map(({ id, name, rating, review }) => {
                    return (
                        <div key={id} className='singleReview'>
                            <div className='reviewHeader'>
                                <h4 className='reviewer-name'>{name}</h4>
                                <div className='review-rating'>
                                    {/* Display stars for rating */}
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={index < rating ? 'filled' : 'unfilled'}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className='review-text'>{review}</p>
                        </div>
                    );
                })}
            </div>

            {/* Feedback Form */}
            <div className='feedbackDiv'>
                <h3>We Value Your Feedback</h3>
                <form onSubmit={handleFeedbackSubmit}>
                    <input 
                        type="text"
                        placeholder="Enter Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="nameInput"
                    />
                    <textarea 
                        placeholder="Enter your feedback here..." 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        rows="5" 
                        className="feedbackInput"
                    />
                    <button className='btn flex' type='submit'>
                        SUBMIT FEEDBACK
                    </button>
                </form>
                {feedbackMessage && <div className="successMessage">{feedbackMessage}</div>}
            </div>
        </section>
    );
};

export default Main;
