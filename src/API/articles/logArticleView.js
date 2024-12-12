// API/articles.js
import { apiHeader, baseUrl } from "../../config/apiConfig";

// Log article view
export const logArticleView = async (userId, articleId) => {
  try {
    const response = await fetch(`${baseUrl}/articles/views/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...apiHeader,
      },
      body: JSON.stringify({
        userId,
        articleId,
      }),
    });

    if (!response.ok) {
      // Handle non-200 responses
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
    }

    const data = await response.json();
    console.log("Article view logged:", data);
  } catch (error) {
    console.error("Error logging article view:", error);
  }
};
