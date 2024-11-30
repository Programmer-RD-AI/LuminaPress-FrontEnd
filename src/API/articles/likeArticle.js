import { apiHeader, baseUrl } from "../../config/apiConfig";

export const likeArticle = async (userId, articleId, isLiked) => {
  const response = await fetch(`${baseUrl}/articles/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...apiHeader,
    },
    body: JSON.stringify({
      userId,
      articleId,
      add_or_remove: isLiked ? "R" : "A", // R for remove, A for add
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update article like status");
  }

  const data = await response.json();

  return data;
};
