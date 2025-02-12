import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook
import i18n from "../i18n"; // Import i18n instance
import "./Navbar.css";

const Navbar: React.FC = (): JSX.Element => {
  const { t } = useTranslation(); // Use translation function
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHaitham, setIsHaitham] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserRoles(token);
    }
  }, []);

  const fetchUserRoles = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Url));
      const roles = decodedPayload["https://portfolio/roles"] || [];

      setIsHaitham(roles.includes("Haitham"));
    } catch (err) {
      console.error("Error decoding user roles:", err);
      setIsHaitham(false);
    }
  };

  const handleLoginRedirect = () => {
    setLoading(true);
    const audience = "https://dev-3bhgduaasaz1xonw.us.auth0.com/api/v2/";
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
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_token");
    sessionStorage.clear();

    setIsAuthenticated(false);
    setIsHaitham(false);
    window.location.href = "/";
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`navbarList ${menuOpen ? "active" : ""}`}>
        <li className="navbarItem">
          <Link to="/" onClick={() => setMenuOpen(false)}>{t("navbar.home")}</Link>
        </li>
        <li className="navbarItem">
          <a href="/#bio" onClick={() => setMenuOpen(false)}>{t("navbar.bio")}</a>
        </li>
        <li className="navbarItem">
          <a href="/#skills-section" onClick={() => setMenuOpen(false)}>{t("navbar.skills")}</a>
        </li>
        <li className="navbarItem">
          <a href="/#projects" onClick={() => setMenuOpen(false)}>{t("navbar.projects")}</a>
        </li>
        <li className="navbarItem">
          <Link to="/comments" onClick={() => setMenuOpen(false)}>{t("navbar.comments")}</Link>
        </li>

        {isAuthenticated && isHaitham && (
          <li className="navbarItem">
            <Link to="/kyrushoAdmin" onClick={() => setMenuOpen(false)}>{t("navbar.adminDashboard")}</Link>
          </li>
        )}

        {!isAuthenticated ? (
          <button className={`loginButton ${loading ? "loading" : ""}`} onClick={handleLoginRedirect} disabled={loading}>
            {loading ? t("navbar.redirecting") : t("navbar.login")}
          </button>
        ) : (
          <button className="loginButton" onClick={handleLogout}>
            {t("navbar.logout")}
          </button>
        )}

        {/* Translation Button */}
        <button className="translateButton" onClick={toggleLanguage}>
          {i18n.language.toUpperCase()}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;