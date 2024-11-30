import axios from "axios";
import { apiHeader, baseUrl } from "../../config/apiConfig";

// Fetch comments for a specific article
export const fetchComments = async (articleId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/articles/comments/${articleId}`,
      { headers: apiHeader }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
