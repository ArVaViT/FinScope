import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const Navbar = ({ links, logoText, isDarkMode }) => {
  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`} aria-label="Main Navigation">
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
