import { Typography, IconButton, styled } from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Footer.css"; // Import the CSS file

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: "0 10px",
  "&:hover": {
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
