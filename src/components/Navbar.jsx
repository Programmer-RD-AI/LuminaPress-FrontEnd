import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider,
  styled,
} from "@mui/material";
import { signOut } from "../redux/slices/authSlice";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import { Link } from "react-router-dom";

// Styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#333",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const AuthButtons = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const ProfileMenu = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const DividerStyled = styled(Divider)({
  margin: "0 8px",
});

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    handleMenuClose();
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          data-cy="site-title"
        >
          <Typography variant="h6" component="div">
            LuminaPress
          </Typography>
        </Link>
        {!isAuthenticated ? (
          <AuthButtons data-cy="auth-buttons">
            <SignUpButton data-cy="sign-up-button" />
            <DividerStyled orientation="vertical" flexItem />
            <SignInButton data-cy="sign-in-button" />
          </AuthButtons>
        ) : (
          <ProfileMenu data-cy="profile-menu">
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              data-cy="avatar"
            >
              <Avatar alt={user.name} src={user.avatarUrl} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              data-cy="menu"
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleSignOut} data-cy="sign-out">
                Sign Out
              </MenuItem>
            </Menu>
          </ProfileMenu>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
