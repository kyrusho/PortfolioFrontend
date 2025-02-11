import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHaitham, setIsHaitham] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated based on the presence of an access token
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserRoles(token);
    }
  }, []);

  const fetchUserRoles = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Url));
      const roles = decodedPayload['https://portfolio/roles'] || []; // Replace with your actual namespace

      setIsHaitham(roles.includes('Haitham')); // Check if user has the "Haitham" role
    } catch (err) {
      console.error('Error decoding user roles:', err);
      setIsHaitham(false);
    }
  };

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

  const handleLogout = () => {
    // Remove authentication tokens from storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_token');
    sessionStorage.clear();

    setIsAuthenticated(false);
    setIsHaitham(false);

    // Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <ul className="navbarList">
        <li className="navbarItem">
          <Link to="/">Home</Link>
        </li>
        <li className="navbarItem">
          <Link to="/">BIO</Link>
        </li>
        <li className="navbarItem">
          <Link to="/">Skills</Link>
        </li>
        <li className="navbarItem">
          <Link to="/">Projects</Link>
        </li>
        <li className="navbarItem">
          <Link to="/comments">Comments</Link>
        </li>

        {/* Show Admin Dashboard if the user is authenticated and has the "Haitham" role */}
        {isAuthenticated && isHaitham && (
          <li className="navbarItem">
            <Link to="/kyrushoAdmin">Admin Dashboard</Link>
          </li>
        )}

        {/* Show login button if not authenticated, otherwise show logout button */}
        {!isAuthenticated ? (
          <button
            className={`loginButton ${loading ? 'loading' : ''}`}
            onClick={handleLoginRedirect}
            disabled={loading}
          >
            {loading ? 'Redirecting...' : 'Login'}
          </button>
        ) : (
          <button className="loginButton" onClick={handleLogout}>
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
