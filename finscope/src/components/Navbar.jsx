import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const Navbar = ({ links, logoText, isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          {logoText}
        </a>
        <ul className="navbar-menu">
          {links.map((link, index) => (
            <li key={index} className="navbar-item">
              <a href={link.href} className="navbar-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-theme-toggle">
        <button
          className="theme-toggle-btn"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
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
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;
