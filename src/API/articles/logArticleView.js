// API/articles.js
import axios from "axios";
import { apiHeader, baseUrl } from "../../config/apiConfig";

// Log article view
export const logArticleView = async (userId, articleId) => {
  try {
    const response = await axios.post(`${baseUrl}/articles/views`, {
      userId,
      articleId,
      headers: apiHeader,
    });
    console.log("Article view logged:", response.data);
  } catch (error) {
    console.error("Error logging article view:", error);
  }
};
