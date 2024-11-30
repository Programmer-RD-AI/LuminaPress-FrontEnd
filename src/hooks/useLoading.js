import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderLoading } from "../redux/slices/loaderSlice"; // Adjust path as needed
import { startLoading, stopLoading } from "../utils/loadingUtils"; // Adjust path as needed
import { useLocation } from "react-router-dom"; // To track route changes

export const useLoading = (isLoading = true) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading); // Get loading state from Redux store
  const location = useLocation(); // Access the current route location

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [lastRoute, setLastRoute] = useState(null);

  // Effect to handle route change and trigger loading behavior
  useEffect(() => {
    if (location.pathname !== lastRoute) {
      setIsFirstLoad(true); // Trigger first load when route changes
    }
    setLastRoute(location.pathname); // Update the last route on each change
  }, [location, lastRoute]);

  // Effect to handle loading state transitions on first load or route change
  useEffect(() => {
    if (isFirstLoad || isLoading || loading) {
      dispatch(setLoaderLoading(true)); // Dispatch loading state to Redux
      startLoading(); // Start the loading side effect (e.g., show loading spinner)
    } else {
      dispatch(setLoaderLoading(false)); // Dispatch loading state to Redux
      stopLoading(); // Stop the loading side effect after transition
    }

    // Handle cleanup to ensure smooth transition
    if (isFirstLoad && !isLoading) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false); // Mark as not the first load after timeout
        stopLoading(); // From loadingUtils
      }, 500); // Optional delay for smooth transition
      return () => clearTimeout(timer); // Cleanup timer on unmount or change
    }
  }, [isFirstLoad, isLoading, loading, dispatch]);

  // The actual showLoader condition: combines the Redux state and isFirstLoad flag
  const showLoader = isLoading || isFirstLoad || loading;

  return {
    showLoader, // This boolean value can be used to display the loader
    setIsFirstLoad, // Optionally, you can expose this function to reset first load manually
    isFirstLoad,
  };
};
