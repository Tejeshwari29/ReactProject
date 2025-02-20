import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { FaMapPin } from 'react-icons/fa';  // Common icon for all packages
import image1 from '../../Assests/image1.jpeg';
import image9 from '../../Assests/image9.jpeg';
import image6 from '../../Assests/image6.jpg';
import image2 from '../../Assests/image2.jpeg';
import image4 from '../../Assests/image4.jpg';
import image3 from '../../Assests/image3.jpg';
import image7 from '../../Assests/image7.jpg';
import image8 from '../../Assests/image8.jpg';
import image10 from '../../Assests/image10.jpg';
import image11 from '../../Assests/image11.jpg';
import image12 from '../../Assests/image12.jpg';
import image13 from '../../Assests/image13.jpg';
import image14 from '../../Assests/image14.jpg';

// Modal styling
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    height: '80%',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out',
  },
};

const Packages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratings, setRatings] = useState({}); // Store ratings for packages

  // Package data (grouped by state)
  const statePackages = {
    "Uttar Pradesh": [
      {
        name: "Taj Mahal",
        description: "Explore the iconic symbol of love in Agra, India.",
        price:"$12000",
        details: `
          The Taj Mahal, located in Agra, India, is one of the most famous monuments in the world. 
          This stunning white marble mausoleum was built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.
          The Taj Mahal is a UNESCO World Heritage site and is known for its stunning architectural beauty, 
          including symmetrical gardens, a reflecting pool, and intricate marble inlays. Visitors can explore the grounds, 
          the mosque, and the mausoleum, and learn about the fascinating history behind its creation.
          Best time to visit: Early morning or late afternoon to avoid the crowds and witness the monument in soft sunlight.
        `,
        image: image1,
        rating: 4.5,
        reviews: [
          { user: "Latha", comment: "Absolutely breathtaking! A must-visit." },
          { user: "Manasa", comment: "Loved the architecture and history." },
        ],
      },
    ],
    "Karnataka": [
      {
        name: "Hampi",
        description: "Discover the ancient ruins and temples of Hampi, Karnataka.",
        price:"$9000",
        details: `
          Hampi, an ancient village in the Indian state of Karnataka, is home to a UNESCO World Heritage site, 
          filled with awe-inspiring ruins from the Vijayanagara Empire. The ruins date back to the 14th century and include 
          massive temples, royal palaces, and giant stone structures that tell the story of a once-glorious kingdom. 
          Key sites to visit in Hampi include the Virupaksha Temple, Vittala Temple with its iconic stone chariot, 
          and the Hazara Rama Temple. The boulders surrounding Hampi are great for rock climbing and trekking, offering 
          scenic views of the landscape.
          Best time to visit: October to March for cooler weather.
        `,
        image: image9,
        rating: 4.6,
        reviews: [
          { user: "Tejas", comment: "Absolutely breathtaking! A must-visit." },
          { user: "Pavan", comment: "good experience." },
        ],
      },
      {
        name: "Mysore Palace",
        description: "Mysore Palace is a magnificent historical palace located in Mysore, Karnataka, India.",
        price:"$9000",
        details: `
          Mysore Palace is an architectural marvel and one of India's most visited monuments. 
          The palace was the residence of the Wodeyar dynasty and served as the seat of the Kingdom of Mysore. 
          Its grandeur and intricate design reflect the glory of the royal family. The palace is a blend of Hindu, 
          Mughal, Rajput, and Gothic architectural styles. Visitors can explore the ornate courtyards, 
          the Durbar Hall, the ornate windows, and the well-maintained gardens.
          The palace is illuminated during the Dussehra festival, which is a sight to behold.
          Best time to visit: During the Dussehra festival (October) when the palace is beautifully lit up.
        `,
        image: image10,
        rating: 4.7,
      },
    ],
    "Delhi": [
      {
        name: "Indian Gate",
        description: "Visit the historic Indian Gate in New Delhi, India.",
        price:"$15000",
        details: `
          The India Gate is one of the most prominent landmarks of New Delhi, India. 
          This 42-meter-high war memorial was built in honor of soldiers who died during World War I. 
          It is located in the heart of the city and is surrounded by lush green lawns, which make it a popular picnic spot.
          The memorial features the names of more than 13,000 soldiers who laid down their lives for the country. 
          The flame at the base, known as the Amar Jawan Jyoti, is a tribute to the unknown soldiers who died in combat.
          Best time to visit: Late evening when the monument is beautifully lit up, or early morning for a peaceful visit.
        `,
        image: image2,
        rating: 4.5,
        reviews: [
          { user: "John", comment: "Beautiful palce." },
          { user: "Smith", comment: "Loved the architecture and history." },
        ],
      },
      {
        name: "Red Fort",
        description: "Visit the historic Red Fort in New Delhi, India.",
        price:"$12000",
        details: `
          The Red Fort, also known as Lal Qila, is one of the most important landmarks of India's history. 
          Built by Mughal Emperor Shah Jahan, the fort served as the residence of the Mughal emperors for around 200 years. 
          The fort is famous for its massive red sandstone walls and its impressive architecture that reflects the grandeur 
          of Mughal design. Key attractions inside the fort include the Diwan-i-Aam, Diwan-i-Khas, the Royal Baths, and 
          the stunning mosque. The fort is also the site of India's Independence Day celebrations.
          Best time to visit: October to March, during cooler months.
        `,
        image: image6,
        rating: 5,
      },
      {
        name: "Qutub Minar",
        description: "The Qutub Minar is a UNESCO World Heritage Site in Delhi, India.",
        price:"$8000",
        details: `
          The Qutub Minar is the tallest brick minaret in the world, standing at 72.5 meters tall. 
          It was built in the early 13th century by Qutb-ud-Din Aibak to mark the beginning of Muslim rule in India. 
          The tower is made of red sandstone and is adorned with intricate carvings and inscriptions in Arabic. 
          The Qutub Minar is surrounded by the Qutub Complex, which includes the Quwwat-ul-Islam Mosque, 
          the Iron Pillar of Delhi, and other historical structures. It's an architectural masterpiece and a must-visit for history buffs.
          Best time to visit: Early morning or late afternoon to avoid the crowds.
        `,
        image: image4,
        rating: 4.3,
      },

    ],
    "Andhra Pradesh": [
      {
        name: "Tirupati",
        description: "Tirupati is a major pilgrimage city in Andhra Pradesh.",
        price:"$5000",
        details: `
          Tirupati is one of the most visited pilgrimage cities in India, famous for the Sri Venkateswara Temple, 
          located on the Tirumala hills. The temple is dedicated to Lord Venkateswara, an incarnation of Lord Vishnu, 
          and is one of the richest and most visited temples in the world. Tirupati attracts millions of devotees 
          every year, and the surrounding hills offer breathtaking views and a serene environment. 
          The town is also famous for its religious fairs and festivals, particularly the Brahmotsavam festival.
          Best time to visit: Throughout the year, but the Brahmotsavam festival (September–October) is a significant occasion.
        `,
        image: image7,
        rating: 4.5,
      },
      {
        name: "Mantralayam",
        description: "Mantralayam is a renowned pilgrimage town located in Andhra Pradesh, India.",
        price:"$6000",
        details: `
          Mantralayam is a small town in the Kurnool district of Andhra Pradesh, known for the shrine of Sri Raghavendra Swamy, 
          a revered saint and philosopher. The temple is located on the banks of the Tungabhadra River and attracts pilgrims 
          from all over India. The serene atmosphere and the temple's historical significance make it a peaceful retreat 
          for spirituality and self-reflection. Visitors can also enjoy the scenic beauty of the surrounding landscapes and 
          the river.
          Best time to visit: During the Raghavendra Swamy Aradhana festival, which falls in the months of February and March.
        `,
        image: image8,
        rating: 4.8,
      },
    ],
    "Kerala": [
      {
        name: "Kerala: For its Backwaters, Beaches & Culture",
        description: "Kerala, known as 'God's Own Country' in India.",
        price:"$10000",
        details: `
          Kerala is a beautiful state located on the southwestern coast of India, renowned for its lush green backwaters, 
          pristine beaches, and rich cultural heritage. The state offers a wide variety of experiences, from tranquil 
          houseboat cruises in the backwaters of Alleppey and Kumarakom, to exploring the vibrant culture in cities like 
          Kochi and Thiruvananthapuram. Kerala is also famous for its Ayurveda, a traditional system of medicine, 
          and visitors can indulge in rejuvenating treatments at one of the many resorts offering Ayurvedic therapies. 
          The state is also known for its colorful festivals, traditional dances like Kathakali, and spicy cuisine.
          Best time to visit: November to March, during the cooler months.
        `,
        image: image3,
        rating: 5,
      },
    ],
    "Maharashtra": [
      {
        name: "Gateway of India",
        description: "The Gateway of India is an iconic monument located in Mumbai, Maharashtra.",
        price:"$12000",
        details: `
          The Gateway of India was built in 1911 to commemorate the visit of King George V and Queen Mary to India. 
          Located on the waterfront in Mumbai, this majestic archway overlooks the Arabian Sea. It is one of the most recognizable 
          symbols of India and a popular tourist attraction. The monument is also the site from where the last British troops 
          left India in 1948, marking the end of British colonial rule. 
          Visitors can also enjoy the stunning views of the Taj Mahal Palace Hotel, situated nearby.
          Best time to visit: October to March for cooler weather.
        `,
        image: image11,
        rating: 4.5,
      },
      {
        name: "Ajanta and Ellora Caves",
        description: "The Ajanta and Ellora Caves are ancient rock-cut cave complexes located in Maharashtra.",
        price:"$12000",
        details: `
          Ajanta and Ellora Caves are two of the most important historical sites in India, known for their intricate 
          rock-cut architecture and religious significance. The Ajanta Caves, dating back to the 2nd century BCE, 
          are famous for their stunning Buddhist murals and sculptures. The Ellora Caves, a UNESCO World Heritage Site, 
          are known for the largest monolithic structure in the world – the Kailasa temple.
          Best time to visit: November to February to avoid the intense summer heat.
        `,
        image: image12,
        rating: 4.8,
      },
    ],
    "Rajasthan": [
      {
        name: "Jaipur - The Pink City",
        description: "Jaipur, known as the Pink City, is famous for its grand palaces and forts.",
        price:"$11000",
        details: `
          Jaipur, the capital of Rajasthan, is known for its rich history, stunning architecture, and vibrant culture. 
          The city is home to several iconic landmarks, including the Hawa Mahal, Amer Fort, and City Palace. 
          Jaipur is also renowned for its bustling markets, selling colorful textiles, jewelry, and handicrafts. 
          The city is part of the Golden Triangle, a popular tourist circuit that also includes Delhi and Agra.
          Best time to visit: October to March, when the weather is cooler.
        `,
        image: image13,
        rating: 4.9,
      },
      {
        name: "Udaipur - The City of Lakes",
        description: "Udaipur is known for its beautiful lakes, palaces, and romantic ambiance.",
        price:"$14000",
        details: `
          Udaipur, located in the Aravalli Hills of Rajasthan, is known for its picturesque lakes and royal palaces. 
          The city is often called the "Venice of the East" because of its beautiful lakes, including Lake Pichola. 
          Major attractions include the City Palace, Jag Mandir, and the Saheliyon ki Bari. The city is also famous 
          for its rich cultural heritage and is a popular destination for couples and honeymooners.
          Best time to visit: October to March, when the weather is ideal for sightseeing and boat rides.
        `,
        image: image14,
        rating: 4,
      },
    ],
  
    // Additional states and packages here...
  };

  // Filtered packages based on search query
  const filteredPackages = Object.values(statePackages)
    .flat()
    .filter(pkg =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Open modal with package data
  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  // Handle selecting a state
  const handleStateClick = (state) => {
    setSelectedState(state);
  };

  // Handle showing all packages
  const handleShowAll = () => {
    setSelectedState(null);
  };

  // Handle rating change
  const handleRatingChange = (pkgName, newRating) => {
    setRatings({
      ...ratings,
      [pkgName]: newRating, // Update the rating for the specific package
    });
  };
  const handleStarClick = (pkgName, newRating) => {
    handleRatingChange(pkgName, newRating); // Update the rating for the specific package
  };
const [newReview, setNewReview] = useState("");

// Function to handle adding a new review
const addReview = () => {
  if (selectedPackage && newReview.trim()) {
    const updatedPackage = {
      ...selectedPackage,
      reviews: [
        ...(selectedPackage.reviews || []), 
        { user: "New User", comment: newReview.trim() } // Add new review
      ]
    };
    
    // Update the selected package with the new review
    setSelectedPackage(updatedPackage);
    setNewReview(""); // Clear the review input
  }
};
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightgrey' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '80px' }}>Our Packages</h2>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        Explore our exciting packages for amazing travel experiences.....!
      </p>

      {/* Search bar */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search packages..."
          style={{
            padding: '10px',
            width: '80%',
            maxWidth: '400px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
      </div>

      {/* State selection */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {Object.keys(statePackages).map((state) => (
          <button
            key={state}
            onClick={() => handleStateClick(state)}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {state}
          </button>
        ))}
        <button
          onClick={handleShowAll}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Show All
        </button>
      </div>

      {/* Displaying packages based on the selected state */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {(selectedState ? statePackages[selectedState] : filteredPackages).map((pkg, index) => (
          <div
            key={index}
            className="package-card"
            onClick={() => openModal(pkg)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: '24px', textAlign: 'center', marginBottom: '10px' }}>
              <FaMapPin />
            </div>
            <h3 style={{ marginBottom: '15px', fontSize: '20px', textAlign: 'center' }}>{pkg.name}</h3>
            <p style={{ marginBottom: '15px', fontSize: '16px', color: '#555', textAlign: 'center' }}>
              {pkg.description}
            </p>
            <p style={{ marginBottom: '15px', fontSize: '16px', color: '#555', textAlign: 'center' }}>
              {pkg.price}
            </p>

            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
  {[...Array(5)].map((_, index) => {
    const isActive = index < (ratings[selectedPackage?.name] || selectedPackage?.rating);
    return (
      <span
        key={index}
        onClick={() => handleStarClick(pkg.name, index + 1)} // Set rating on click
        style={{
          color: isActive ? 'gold' : 'gold',
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        ★
      </span>
    );
  })}
</div>

            <button
              className="btn btn-primary"
              style={{ width: '50%', padding: '10px', borderRadius: '5px', textAlign: 'center' }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for full-screen package view */}
      {/* Modal for full-screen package view */}
<Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyles}>
  {selectedPackage && (
    <>
      <h2 style={{ textAlign: "center" }}>{selectedPackage.name}</h2>
      <img
        src={selectedPackage.image}
        alt={selectedPackage.name}
        style={{ width: "100%", maxHeight: "300px", marginBottom: "20px" }}
      />
      <p>{selectedPackage.details}</p>

      {/* User Reviews Section */}
      <h3 style={{ marginTop: "20px" }}>User Reviews:</h3>
      {selectedPackage.reviews?.length > 0 ? (
        <ul style={{ padding: "0", listStyleType: "none" }}>
          {selectedPackage.reviews.map((review, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <strong>{review.user}</strong>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}

      {/* New Review Input */}
      <div style={{ marginTop: "20px" }}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={addReview}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>

      {/* Close Button */}
      <button
        onClick={closeModal}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </>
  )}
</Modal>



      {/* Back to Home Link */}
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '30px',
          textDecoration: 'none',
          color: '#007bff',
          fontSize: '16px',
          display: 'block',
          textAlign: 'center',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Packages;
