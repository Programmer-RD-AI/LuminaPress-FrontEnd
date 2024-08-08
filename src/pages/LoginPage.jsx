// src/pages/LoginPage.js
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

const LoginFormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
}));

const LoginPage = () => (
  <Container>
    <Fade in timeout={1000}>
      <Typography variant="h1" align="center" gutterBottom color="primary">
        Login
      </Typography>
    </Fade>
    <Zoom in timeout={1500}>
      <LoginFormContainer elevation={3}>
        <Typography variant="h5" gutterBottom>
          Welcome Back! Please log in to your account.
        </Typography>
        <Typography variant="body1" paragraph>
          If you have an account with us, please log in to access your dashboard
          and enjoy personalized features. If you don’t have an account yet, you
          can sign up on our registration page.
        </Typography>
        <form style={{ width: "100%" }}>
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "16px" }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center" marginTop={2}>
                Don’t have an account? <a href="/signup">Sign Up</a>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </LoginFormContainer>
    </Zoom>
  </Container>
);

export default LoginPage;
