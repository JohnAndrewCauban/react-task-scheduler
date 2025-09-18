import React from 'react';

// Theme toggle component
const ThemeToggleButton = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      className="theme-toggle-btn" 
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icon or text indicating current mode */}
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;