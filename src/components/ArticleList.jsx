import React from "react";
import ArticleCard from "./ArticleCard";
import { Box, Typography } from "@mui/material";
import { articles } from "../data/articles";
import { motion } from "framer-motion";
import "../assets/styles/ArticleList.css";

const categorizedArticles = {
  Trending: articles.filter((article) => article.featured),
  Latest: articles.filter(
    (article) => !article.featured && article.rating >= 4
  ),
  Popular: articles.filter((article) => article.rating < 4),
};

const ArticleList = () => (
  <Box
    component={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="article-list-container"
    data-cy="article-list" // Add data-cy here
  >
    {Object.keys(categorizedArticles).map((category) => (
      <Box key={category} className="article-section" data-cy="article-section">
        <Typography variant="h4" component="h2" className="section-title">
          {category}
        </Typography>
        <Box component={motion.div} className="article-list">
          {categorizedArticles[category].map((article, index) => (
            <Box
              component={motion.div}
              key={index}
              className="article-list-item"
              data-cy="article-list-item" // Add data-cy here
            >
              <ArticleCard {...article} />
            </Box>
          ))}
        </Box>
      </Box>
    ))}
    <div className="background-animation"></div>
  </Box>
);

export default ArticleList;
