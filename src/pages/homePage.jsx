import React, { useEffect } from "react";
import ArticleList from "../components/Articles/ArticleList/articleList";
import { useArticles } from "../hooks/useArticles";

const HomePage = () => {
  const { handleFetchArticles } = useArticles();

  useEffect(() => {
    // Fetch new articles when the home page loads
    handleFetchArticles({ type: "new" });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <ArticleList />
    </>
  );
};

export default HomePage;
