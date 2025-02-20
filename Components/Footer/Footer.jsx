import React, { useState, useEffect } from 'react';
import './footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show or hide the back-to-top button based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add event listener for scrolling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="footer">
      {/* Top Section */}
      <div className="top">
        <div>
          <h1>Travel</h1>
          <p>Choose your favourite destination.</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        {/* Social Media Icons */}
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        {/* Project and Community Sections */}
        <div className="footer-links">
          <div className="footer-section">
            <h3>Project</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/roadmap">Roadmap</a></li>
              <li><a href="/team">Our Team</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Community</h3>
            <ul>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a href="https://reddit.com/r/trippy" target="_blank" rel="noopener noreferrer">Reddit</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Help</h3>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/support">Support Center</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Other</h3>
            <ul>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Footer;
