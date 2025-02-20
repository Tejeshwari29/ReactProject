import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TourDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTour } = location.state || {};

  useEffect(() => {
    // Redirect to the tours page if no tour is selected
    if (!selectedTour) {
      navigate('/tours', { replace: true }); // Redirect to the tours page
    }
  }, [selectedTour, navigate]);

  if (!selectedTour) {
    return null; // Render nothing while redirecting
  }

  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(selectedTour.name)}`;

  return (
    <div className="tour-details">
      <iframe
        src={wikipediaUrl}
        width="100%"
        height="600px"
        title={`${selectedTour.name} Wikipedia`}
        style={{ border: 'none' }}
      ></iframe>
      <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
        Go Back
      </button>
    </div>
  );
};

export default TourDetails;
