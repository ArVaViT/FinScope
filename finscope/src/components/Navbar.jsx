import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({ links, logoText, onLogout }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const handleBurgerClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-container">
          <a href="/" className="navbar-logo">{logoText}</a>
        </div>
        <ul className={`navbar-menu ${isMenuOpen ? 'expanded' : ''}`}>
          {links.map((link, index) => (
            <li key={index} className="navbar-item">
              <a href={link.href} className="navbar-link">{link.label}</a>
            </li>
          ))}
          <li className="navbar-item mobile-logout">
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </li>
        </ul>
        <div className="navbar-right">
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
        <button className="navbar-toggle" onClick={handleBurgerClick}>
          <span className="menu-icon">&#9776;</span>
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
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
