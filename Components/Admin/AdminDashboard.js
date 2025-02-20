import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('jwt_token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  // Fetch tours function (moved outside of useEffect)
  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:5271/api/tours', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTours(response.data);
    } catch (err) {
      setError('Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data on initial load
  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/');
    } else {
      fetchTours(); // Call fetchTours when the component mounts
    }
  }, [token, role, navigate]);

  // Handle tour delete
  const handleDelete = async (tourId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5271/api/admin/deletetour/${tourId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTours(tours.filter((tour) => tour.id !== tourId));
      }
    } catch (err) {
      setError('Failed to delete the tour.');
    }
  };

  // Handle tour update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5271/api/admin/updatetour/${selectedTour.id}`,
        selectedTour,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTours(); // Re-fetch tours after the update
      setSelectedTour(null); // Clear selected tour after update
    } catch (err) {
      setError('Failed to update tour');
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTour((prevTour) => ({
      ...prevTour,
      [name]: value,
    }));
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Profile Image in Navswbar */}
      <div className="navbar">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>

      {/* Tour Management Table */}
      <table className="admin-tours-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.length === 0 ? (
            <tr>
              <td colSpan="5">No tours available</td>
            </tr>
          ) : (
            tours.map((tour) => (
              <tr key={tour.id}>
                <td>{tour.id}</td>
                <td>{tour.name}</td>
                <td>{tour.description}</td>
                <td>{tour.duration}</td>
                <td>
                  <button onClick={() => setSelectedTour(tour)}>Update</button>
                  <button onClick={() => handleDelete(tour.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Update Tour Form */}
      {selectedTour && (
        <div className="update-tour-form">
          <h3>Update Tour</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={selectedTour.name}
              onChange={handleInputChange}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={selectedTour.description}
              onChange={handleInputChange}
            />
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={selectedTour.duration}
              onChange={handleInputChange}
            />
            <button type="submit">Update Tour</button>
            <button type="button" onClick={() => setSelectedTour(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
