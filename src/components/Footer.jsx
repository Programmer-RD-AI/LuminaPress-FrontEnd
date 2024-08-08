import React from "react";
import { Box, Typography, Link, IconButton, styled } from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Footer.css"; // Import the CSS file

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: "20px",
  textAlign: "center",
  position: "relative",
  bottom: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexDirection: "row",
  maxWidth: "1200px",
  width: "100%",
  marginBottom: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const DescriptionSection = styled(Box)(({ theme }) => ({
  flex: "0 1 50%",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    marginBottom: "20px",
  },
}));

const InfoSection = styled(Box)(({ theme }) => ({
  flex: "0 1 50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

const SocialMediaContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: "0 10px",
  "&:hover": {
    color: theme.palette.primary.light,
  },
}));

const FooterDescription = styled(Typography)(({ theme }) => ({
  marginBottom: "20px",
  maxWidth: "100%",
  fontSize: "14px",
  lineHeight: "1.6",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  margin: "0 10px",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.light,
  },
}));

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content container mx-auto px-5 py-6">
        <div className="footer-sections">
          <motion.div
            className="footer-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="footer-title">LuminaPress</h2>
            <p className="footer-description">
              LuminaPress is your go-to source for the latest news and updates
              in technology and innovation. Our platform provides insightful
              articles, reviews, and analysis on a wide range of tech topics.
              Stay informed and engaged with our expertly curated content.
            </p>
          </motion.div>
          <motion.div
            className="footer-connect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="footer-title">Follow Us on</h2>
            <div className="social-media">
              <SocialIconButton href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </SocialIconButton>
              <SocialIconButton href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton href="https://linkedin.com" target="_blank">
                <LinkedInIcon />
              </SocialIconButton>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="footer-credits"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography variant="body2" component="p">
          © 2024 LuminaPress. All rights reserved.
        </Typography>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
