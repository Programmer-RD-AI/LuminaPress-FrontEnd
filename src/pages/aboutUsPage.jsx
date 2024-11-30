import React from "react";
import { motion } from "framer-motion";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Styled Components
const PageContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#0f0f0f",
  color: "#ffffff",
  minHeight: "100vh",
  padding: theme.spacing(6),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(45deg, rgba(20,20,20,0.9) 0%, rgba(30,30,30,0.6) 100%)",
    zIndex: 1,
    pointerEvents: "none",
  },
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.125)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const AboutUsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <PageContainer maxWidth={false}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title Section */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            gutterBottom
            align="center"
            sx={{
              color: "white",
              fontWeight: 700,
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
              mb: 4,
            }}
          >
            About Us
          </Typography>
        </motion.div>

        {/* Intro Section */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h4"
            paragraph
            align="center"
            sx={{
              color: "gray",
              mb: 4,
              fontWeight: 300,
            }}
          >
            Welcome to our platform!
          </Typography>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "lightgray",
              textAlign: "center",
              maxWidth: 800,
              mx: "auto",
              mb: 6,
            }}
          >
            We are a team of passionate individuals committed to bringing you
            the best content. Our mission is to provide valuable information and
            resources on various topics.
          </Typography>
        </motion.div>

        {/* Cards Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[
            {
              title: "Our Vision",
              content:
                "To be a leading source of knowledge and inspiration, empowering individuals through valuable content and engaging resources.",
            },
            {
              title: "Our Mission",
              content:
                "To deliver high-quality information and resources that enhance learning and growth, fostering a community of informed and empowered individuals.",
            },
            {
              title: "Our Values",
              content:
                "Integrity, Excellence, Innovation, and Community. We uphold these values in every aspect of our work.",
            },
          ].map((section, index) => (
            <Grid item xs={12} md={4} key={section.title}>
              <motion.div variants={itemVariants}>
                <GlassCard elevation={3}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "white",
                      textAlign: "center",
                      borderBottom: "2px solid rgba(255,255,255,0.2)",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "lightgray",
                      textAlign: "center",
                    }}
                  >
                    {section.content}
                  </Typography>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Team Section */}
        <motion.div variants={itemVariants}>
          <Box textAlign="center">
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "white",
                mb: 2,
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "lightgray",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Our dedicated team brings a wealth of experience and expertise to
              our platform. We are committed to continuous improvement and
              innovation to better serve our community.
            </Typography>
          </Box>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default AboutUsPage;
