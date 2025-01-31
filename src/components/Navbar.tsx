import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Navbar.css';

const Navbar: React.FC = (): JSX.Element => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbarList">
        {/* Use Link to navigate to the root '/' */}
        <li onClick={() => scrollToSection('home')} className="navbarItem">
          <Link to="/">Home</Link> {/* Link to the root path */}
        </li>
        <li onClick={() => scrollToSection('bio')} className="navbarItem">
          <Link to="/">BIO</Link> {/* Link to the root path */}
        </li>
        <li onClick={() => scrollToSection('skills-section')} className="navbarItem">
          <Link to="/">Skills</Link> {/* Link to the root path */}
        </li>
        <li onClick={() => scrollToSection('projects')} className="navbarItem">
          <Link to="/">Projects</Link> {/* Link to the root path */}
        </li>
        {/* Comments link */}
        <li className="navbarItem">
          <Link to="/comments">Comments</Link> {/* Link to the comments page */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
