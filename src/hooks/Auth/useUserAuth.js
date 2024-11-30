import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signOut,
  setLoading,
  setError,
} from "../../redux/slices/authSlice";
import { loginUser } from "../../API/users/loginUser";
import { registerUser } from "../../API/users/registerUser";

export const useUserAuth = () => {
  const dispatch = useDispatch();

  // Get authentication state from Redux store
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.auth
  );

  // Sign in a user
  const signInUser = (email, password) => {
    dispatch(signIn(loginUser(email, password))); // Dispatch the signIn action with user data
  };

  // Sign out a user
  const signOutUser = () => {
    dispatch(signOut()); // Dispatch the signOut action
  };

  // Set loading state
  const setLoadingState = (loadingState) => {
    dispatch(setLoading(loadingState)); // Dispatch the setLoading action
  };

  // Set error state
  const setErrorState = (errorMessage) => {
    dispatch(setError(errorMessage)); // Dispatch the setError action
  };

  const signUpUser = (email, password) => {
    dispatch(signIn(registerUser(email, password).user));
  };
  return {
    isAuthenticated,
    user,
    loading,
    error,
    signInUser,
    signOutUser,
    setLoadingState,
    setErrorState,
    signUpUser,
  };
};
