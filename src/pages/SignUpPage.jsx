// src/pages/SignUpPage.js
import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";

const SignUpFormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const SignUpPage = () => (
  <Container>
    <Fade in timeout={1000}>
      <Typography variant="h1" align="center" gutterBottom color="primary">
        Sign Up
      </Typography>
    </Fade>
    <Zoom in timeout={1500}>
      <SignUpFormContainer elevation={3}>
        <Typography variant="h5" gutterBottom>
          Create an Account
        </Typography>
        <Typography variant="body1" paragraph>
          Join us to access exclusive content and features. Fill out the form
          below to create your account. If you already have an account, you can{" "}
          <a href="/login">log in here</a>.
        </Typography>
        <form style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                required
                variant="outlined"
                placeholder="Your Username"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                required
                variant="outlined"
                placeholder="example@example.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
                variant="outlined"
                placeholder="******"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                required
                variant="outlined"
                placeholder="******"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "16px" }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center" marginTop={2}>
                Already have an account? <a href="/login">Log In</a>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </SignUpFormContainer>
    </Zoom>
  </Container>
);

export default SignUpPage;
