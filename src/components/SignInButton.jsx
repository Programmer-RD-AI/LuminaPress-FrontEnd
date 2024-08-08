import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { signIn } from "../redux/slices/authSlice";

const SignInButton = () => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    const user = {
      name: "John Doe",
      avatarUrl: "https://via.placeholder.com/150",
    };
    dispatch(signIn(user));
  };

  return (
    <Button variant="outlined" color="inherit" onClick={handleSignIn}>
      Sign In
    </Button>
  );
};

export default SignInButton;
