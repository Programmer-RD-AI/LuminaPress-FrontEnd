import { useDispatch, useSelector } from "react-redux";
import { setArticles, setArticleType } from "../redux/slices/articlesSlice";
import { setLoaderLoading } from "../redux/slices/loaderSlice"; // Assuming you have this slice for loading state
import { fetchArticles } from "../API/articles/fetchArticles"; // Assuming you have this for fetching articles

export const useArticles = () => {
  const dispatch = useDispatch();

  // Get articles and articleType from Redux store
  const { articles, articleType } = useSelector((state) => state.articles);
  const loading = useSelector((state) => state.loader.loading); // Assuming you have a loading state

  // Set articles state
  const updateArticles = (newArticles) => {
    dispatch(setArticles(newArticles)); // Dispatch the setArticles action with the new articles
  };

  // Set article type state
  const updateArticleType = (type) => {
    dispatch(setArticleType(type)); // Dispatch the setArticleType action with the new article type
  };

  // Function to handle fetching articles based on parameters
  const handleFetchArticles = async (parameters, navigate) => {
    try {
      dispatch(setLoaderLoading(true)); // Set loading state to true

      if (parameters.type) {
        await dispatch(fetchArticles({ params: { type: parameters.type } }));
      } else if (parameters.query) {
        await dispatch(
          fetchArticles({ endpoint: "search", params: { q: parameters.query } })
        );
      } else if (parameters.tag) {
        await dispatch(fetchArticles({ params: { tag: parameters.tag } }));
      }

      dispatch(setLoaderLoading(false)); // Set loading state to false
      navigate("/"); // Navigate to a different route
    } catch (error) {
      dispatch(setLoaderLoading(false)); // Set loading state to false if there is an error
      console.error("Error fetching articles:", error);
    }
  };

  return {
    articles,
    articleType,
    updateArticles,
    updateArticleType,
    handleFetchArticles,
    loading,
  };
};
