import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // Import useLocation to get pathname
import {
  setActive,
  setIsAuthenticated,
  setLoading,
  setError,
} from "../redux/slices/navbarSlice";
import { useEffect } from "react";

export const useNavbar = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location object
  const { pathname } = location; // Extract pathname from location

  // Get state from the Redux store
  const { activeOn, isAuthenticated, loading, error } = useSelector(
    (state) => state.navbar
  );

  // Set the active state (for highlighting active navbar item)
  const updateActive = (activeItem) => {
    dispatch(setActive(activeItem));
  };

  // Set the authentication status (e.g., for showing login/logout buttons)
  const updateAuthentication = (status) => {
    dispatch(setIsAuthenticated(status));
  };

  // Set loading state (useful for showing a loading indicator)
  const setNavLoading = (status) => {
    dispatch(setLoading(status));
  };

  // Set error state (for handling any navbar-related errors)
  const setNavError = (errorMessage) => {
    dispatch(setError(errorMessage));
  };

  // Use useEffect to update active navbar item based on the current pathname
  useEffect(() => {
    if (pathname === "/") {
      dispatch(setActive("home"));
    } else if (pathname === "/new") {
      dispatch(setActive("new"));
    } else if (pathname === "/popular") {
      dispatch(setActive("popular"));
    } else if (pathname === "/trending") {
      dispatch(setActive("trending"));
    } else {
      dispatch(setActive(null));
    }
  }, [pathname, dispatch]); // Re-run the effect when pathname changes

  return {
    activeOn,
    isAuthenticated,
    loading,
    error,
    updateActive,
    updateAuthentication,
    setNavLoading,
    setNavError,
  };
};
