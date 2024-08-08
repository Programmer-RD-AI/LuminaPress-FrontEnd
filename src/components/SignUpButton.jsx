import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { signIn } from "../redux/slices/authSlice";

const SignUpButton = () => {
  const dispatch = useDispatch();

  const handleSignUp = () => {
    const user = {
      name: "Jane Doe",
      avatarUrl: "https://via.placeholder.com/150",
    };
    dispatch(signIn(user));
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};

export default SignUpButton;
