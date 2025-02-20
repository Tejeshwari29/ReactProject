import React, { useEffect, useState } from 'react';
import './Tours.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Tours = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:5271/api/tours');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleBookNow = (tour, event) => {
    event.preventDefault();
    navigate('/booking', { state: { selectedTour: tour } });
  };

  const handleMoreInfo = (tour, event) => {
    event.preventDefault();
    navigate('/tour-details', { state: { selectedTour: tour } }); // Pass the selected tour to TourDetails
  };

  return (
    <div className="tours">
      <h2>Our Tours</h2>
      <p>Explore our exciting range of tours designed for all types of travelers!</p>

      {loading && <p>Loading tours...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <table className="tours-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Action</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {tours.length === 0 ? (
              <tr>
                <td colSpan="6">No tours available</td>
              </tr>
            ) : (
              tours.map(tour => (
                <tr key={tour.id}>
                  <td>{tour.id}</td>
                  <td>{tour.name}</td>
                  <td>{tour.description}</td>
                  <td>{tour.duration}</td>
                  <td>
                    <button
                      onClick={(event) => handleBookNow(tour, event)}
                      className="book-now-btn"
                    >
                      Book Now
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(event) => handleMoreInfo(tour, event)}
                      className="more-info-btn"
                    >
                      More
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/" style={{ fontSize: '16px', color: '#007bff', textDecoration: 'none' }}>
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Tours;
