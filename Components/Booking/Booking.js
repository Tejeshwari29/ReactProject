import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booking.css'; // Custom CSS file for styling
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tour, setTour] = useState('');
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  const location = useLocation();
  const { selectedTour } = location.state || {};

  const tourPrices = {
    "taj-mahal": 12000,
    "hampi": 9000,
    "mysore": 9000,
    "jaipur-pink-city": 11000,
    "udaipur-city-of-lakes": 14000,
    "india-gate": 15000,
    "red-fort": 12000,
    "qutub-minar": 8000,
    "tirupathi": 5000,
    "mantralayam": 6000,
    "kerala-backwater": 10000,
    "gateway-of-india": 12000,
    "ajanta-ellora": 12000,
  };

  useEffect(() => {
    if (selectedTour) {
      setTour(selectedTour.name);
      setPrice(tourPrices[selectedTour.name]);
    }
  }, [selectedTour]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !tour || !price || !date) {
      setMessage('Please fill in all fields.');
      return;
    }

    const bookingData = { name, email, tour, price, date };

    try {
      const response = await axios.post('http://localhost:5271/api/booking/bookings', bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setBookingStatus('Booking successful! We will get in touch with you soon.');
        setName('');
        setEmail('');
        setTour('');
        setPrice(null);
        setDate('');

        // Clear the status message after 3 seconds
        setTimeout(() => setBookingStatus(null), 3000);
      } else {
        setMessage('Failed to book the tour. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
      setMessage('An error occurred while booking. Please try again.');
    }
  };

  return (
    <div className="booking">
      <h2>Booking Page</h2>
      <p>Here you can book your selected tour! Explore these amazing destinations.</p>

      <div className="booking-form">
        <h3>Book Your Tour Now</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Tour:
            <select
              value={tour}
              onChange={(e) => {
                setTour(e.target.value);
                setPrice(tourPrices[e.target.value]);
              }}
              required
            >
              <option value="">Select Tour</option>
              {Object.keys(tourPrices).map((key) => (
                <option key={key} value={key}>
                  {key.replace(/-/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          {price && <div className="tour-price">Price: ₹{price}</div>}

          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <button type="submit">Book Now</button>
        </form>

        {bookingStatus && <div className="successMessage">{bookingStatus}</div>}
        {message && <div className="errorMessage">{message}</div>}
      </div>
    </div>
  );
};

export default Booking;