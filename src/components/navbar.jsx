import { useState } from "react";
import {
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../hooks/useTheme";
import styles from "../styles/components/navbar.module.css";
import { signOut } from "../redux/slices/authSlice";
import { useArticles } from "../hooks/useArticles";
import { useNavbar } from "../hooks/useNavbar";
import DOMPurify from "dompurify";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Theme hook
  const { themeToggle, isDarkMode } = useTheme();

  const possibleLabels = [
    "Politics",
    "Economy",
    "Technology",
    "Health",
    "Science",
    "Environment",
    "Education",
    "Sports",
    "Entertainment",
    "Culture",
    "Business",
    "Lifestyle",
    "Travel",
  ];

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated, user);
  const { handleFetchArticles } = useArticles();

  const { activeOn } = useNavbar();
  const userId = useSelector((state) => state.auth.user);

  const handleCategoryClick = (category) => {
    setShowDropdown(false);
    handleFetchArticles({ tag: category }, navigate);
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setSearchTerm(DOMPurify.sanitize(searchQuery));

    handleFetchArticles({ query: searchQuery }, navigate);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo_wrapper}>
        <img src="/public/logo.png" alt="Logo" width={50} height={50} />
        <span className={styles.logoText}>LuminaPress</span>
      </div>
      <nav className={styles.nav}>
        <div className={styles.navItems}>
          {/* Navigation Links */}
          {["Home", "New", "Popular", "Trending"].map((item) => (
            <span
              key={item.toLowerCase()}
              className={`${styles.navLink} ${activeOn === item.toLowerCase() ? styles.active : ""}`}
              onClick={() =>
                handleFetchArticles(
                  {
                    type:
                      item.toLowerCase() === "home"
                        ? "new"
                        : item.toLowerCase(),
                  },
                  navigate,
                )
              }
            >
              {item}
            </span>
          ))}

          {/* Categories Dropdown */}
          <span
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className={styles.categories}
          >
            Categories
            {showDropdown && (
              <div className={styles.dropdown}>
                {possibleLabels.map((label) => (
                  <span
                    key={label}
                    className={styles.dropdownItem}
                    onClick={() => handleCategoryClick(label)}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </span>

          {/* Theme Toggle */}
          <span
            className={styles.themeToggle}
            onClick={themeToggle}
            title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </span>
        </div>

        {/* Search and Auth Section */}
        <div className={styles.authSearchWrapper}>
          <span className={styles.searchIcon}>
            <FaSearch />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
            placeholder="Search articles..."
          />

          {/* Authentication Section */}
          <div className={styles.authSection}>
            {isAuthenticated ? (
              <div
                className={styles.profileWrapper}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className={styles.profileInfo}>
                  <FaUserCircle className={styles.profileIcon} />
                  <span className={styles.profileName}>
                    {user?.name || "User"}
                  </span>
                </div>
                {showDropdown && (
                  <div className={styles.profileDropdown}>
                    <Link
                      to={`/p/${userId}`}
                      className={styles.profileDropdownItem}
                    >
                      <FaUser size={14} />
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(signOut());
                        setShowDropdown(false);
                      }}
                      className={styles.profileDropdownItem}
                    >
                      <FaSignOutAlt size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={styles.loginButton}>
                  Login
                </Link>
                <Link to="/signup" className={styles.signupButton}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
