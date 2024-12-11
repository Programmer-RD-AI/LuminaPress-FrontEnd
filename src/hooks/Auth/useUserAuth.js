// useUserAuth.js
import { useDispatch, useSelector } from "react-redux";
import { signOut, setLoading, setError } from "../../redux/slices/authSlice";
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
    return dispatch(loginUser({ email, password }));
  };

  // Sign out a user
  const signOutUser = () => {
    dispatch(signOut());
  };

  // Set loading state
  const setLoadingState = (loadingState) => {
    dispatch(setLoading(loadingState));
  };

  // Set error state
  const setErrorState = (errorMessage) => {
    dispatch(setError(errorMessage));
  };

  // Sign up a user
  const signUpUser = (email, password) => {
    console.log(email, password);
    return dispatch(registerUser({ email, password }));
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
