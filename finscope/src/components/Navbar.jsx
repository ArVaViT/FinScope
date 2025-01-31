import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const Navbar = ({ links, logoText, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`} aria-label="Main Navigation">
      <div className="navbar-header">
        <div className="navbar-logo-container">
          <a href="/" className="navbar-logo" aria-label="Home">
            {logoText}
          </a>
        </div>
        <button
          className="navbar-toggle"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          <span className="menu-icon">&#9776;</span>
        </button>
      </div>
      <div className={`navbar-menu-container ${isMenuOpen ? 'expanded' : ''}`}>
        <ul className="navbar-menu" aria-expanded={isMenuOpen}>
          {links.map((link, index) => (
            <li key={index} className="navbar-item">
              <a 
                href={link.href} 
                className="navbar-link" 
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  logoText: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Navbar;
