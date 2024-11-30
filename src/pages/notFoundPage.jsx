import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        variant="h1"
        sx={{ fontWeight: "bold", fontSize: "4rem", mb: 2 }}
      >
        404
      </Typography>
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        variant="h5"
        sx={{ mb: 3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Box
        component={motion.div}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ mt: 2 }}
      >
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
