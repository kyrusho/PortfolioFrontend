import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track login status

  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    // Check if the user is logged in based on the presence of an Auth0 token
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
const [isHaitham, setIsHaitham] = useState<boolean>(false); // State to check if the user has the "Zako" role

  useEffect(() => {
    const fetchUserRoles = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('No access token found');
        setIsHaitham(false);
        return;
      }

      try {
        const base64Url = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || []; // Replace with your namespace

        setIsHaitham(roles.includes('Haitham')); // Check if the user has the "Zako" role
      } catch (err) {
        console.error('Error decoding user roles:', err);
        setIsHaitham(false);
      }
    };  
    fetchUserRoles(); // Fetch and check user roles
  }, []);
  
    

  const handleLoginRedirect = () => {
    setLoading(true);
    const audience = 'https://dev-3bhgduaasaz1xonw.us.auth0.com/api/v2/';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    window.location.href =
      `https://dev-3bhgduaasaz1xonw.us.auth0.com/authorize?` +
      `response_type=token&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=openid profile email read:current_user read:roles&` +
      `audience=${audience}&` +
      `prompt=login`;
  };

  return (
    <nav className="navbar">
      <ul className="navbarList">
        <li onClick={() => scrollToSection('home')} className="navbarItem">
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => scrollToSection('bio')} className="navbarItem">
          <Link to="/">BIO</Link>
        </li>
        <li onClick={() => scrollToSection('skills-section')} className="navbarItem">
          <Link to="/">Skills</Link>
        </li>
        <li onClick={() => scrollToSection('projects')} className="navbarItem">
          <Link to="/">Projects</Link>
        </li>
        <li className="navbarItem">
          <Link to="/comments">Comments</Link>
        </li>

                {isAuthenticated && isHaitham && (
          <li className="navbarItem">
            <Link to="/kyrushoAdmin">Admin Dashboard</Link>
          </li>
        )}

        {/* Conditionally render the login button */}
        {!isAuthenticated && (
          <button
            className={`loginButton ${loading ? 'loading' : ''}`}
            onClick={handleLoginRedirect}
            disabled={loading}
          >
            {loading ? 'Redirecting...' : 'Login'}
          </button>
        )}

<button onClick={() => changeLanguage('en')}>🇺🇸 English</button>
<button onClick={() => changeLanguage('fr')}>🇫🇷 Français</button>



      </ul>
    </nav>
  );
};

export default Navbar;
