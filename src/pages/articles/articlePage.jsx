import "../../styles/pages/ArticlePage.css";
import { logArticleView } from "../../API/articles/logArticleView.js";
import { fetchArticles } from "../../API/articles/fetchArticles.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaBookmark, FaLink, FaMoon, FaSun } from "react-icons/fa";
import ShareButton from "../../components/Articles/share.jsx";
import LikeButton from "../../components/Articles/likeButton.jsx";
import { setLoaderLoading } from "../../redux/slices/loaderSlice.js";
import {
  addBookmark,
  removeBookmark,
} from "../../redux/slices/bookmarkSlice.js"; // Updated import
import Comments from "../../components/Articles/comment.jsx";
import { showSnackbar } from "../../redux/slices/snackbarSlice.js";

const ArticlePage = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [submittedLink, setSubmittedLink] = useState("");

  // Get bookmarked article IDs from Redux store
  const bookmarkedArticleIds = useSelector(
    (state) => state.bookmarks.articleIds
  );

  const [article, setArticle] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        dispatch(setLoaderLoading(true));
        const response = await dispatch(
          fetchArticles({
            endpoint: "article",
            params: { articleId },
          })
        );
        setArticle(response.payload || null);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        dispatch(setLoaderLoading(false));
      }
    };

    fetchArticleData();
  }, [dispatch, articleId]);
  const handleLinkSubmission = async (e) => {
    e.preventDefault();

    // Basic URL validation
    const urlPattern = /^https?:\/\/\S+$/;
    if (!urlPattern.test(submittedLink)) {
      showSnackbar("Please enter a valid URL", "error");
      return;
    }

    try {
      // Simulate API call to submit link
      dispatch(setLoaderLoading(true));

      // Simulated async operation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success snackbar
      showSnackbar(
        "Thank you for submitting your article link! Our team will review it soon.",
        "success"
      );

      // Reset link input
      setSubmittedLink("");
    } catch (error) {
      showSnackbar("Failed to submit link. Please try again.", "error");
    } finally {
      dispatch(setLoaderLoading(false));
    }
  };

  useEffect(() => {
    if (articleId && isAuthenticated && article) {
      logArticleView(user?.id, article.id);
    }
  }, [articleId, isAuthenticated, article, user]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (article?.Images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (article?.Images?.length || 1) - 1 : prev - 1
    );
  };

  // New function to handle bookmark toggle
  const handleBookmarkToggle = () => {
    if (!article) return;

    if (bookmarkedArticleIds.includes(article.id)) {
      dispatch(removeBookmark(article.id));
    } else {
      dispatch(addBookmark(article.id));
    }
  };

  if (!article) {
    return (
      <div className={`not-found ${isDarkMode ? "dark" : ""}`}>
        <h1>Article not found</h1>
        <p>We are sorry, but the article you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <article className={`article-container ${isDarkMode ? "dark" : ""}`}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="theme-toggle"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className="hero-layout">
        <div className="hero-image">
          <img
            src={
              article.Images && article.Images.length > 0
                ? article.Images[0]
                : ""
            }
            alt="Hero"
          />
          <div className="image-overlay"></div>
        </div>

        <div className="title-container">
          <div className="category-tag">{article.category}</div>
          <h1>{article.title}</h1>
          <h2>{article.subtitle}</h2>
        </div>
      </div>

      <div className={`meta-bar ${isScrolled ? "sticky" : ""}`}>
        <div className="meta-left">
          <div className="author-info">
            <img src={article.authorImage} alt={article.authors} />
            <div className="author-meta">
              <span className="author-name">
                By {article.authors ? article.authors.join(", ") : ""}
              </span>
              <span className="publish-date">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="meta-right">
          <button
            className={`action-button ${bookmarkedArticleIds.includes(article.id) ? "bookmarked" : ""}`}
            onClick={handleBookmarkToggle}
          >
            <FaBookmark
              color={
                bookmarkedArticleIds.includes(article.id)
                  ? "yellow"
                  : "currentColor"
              }
            />
          </button>
          <ShareButton />
          <LikeButton
            articleId={articleId}
            likes={article.likes}
            liked_by={article.liked_by.map((user) => user.id || user.user)}
          />
        </div>
      </div>

      <div className="main-content">
        <div className="content">{article.description}</div>

        {article.Images && article.Images.length > 0 && (
          <div className="image-carousel">
            <button className="carousel-btn prev" onClick={handlePrevImage}>
              ‹
            </button>
            <div className="carousel-container">
              <img
                src={article.Images[currentImageIndex]}
                alt={`Article image ${currentImageIndex + 1}`}
              />
              <p className="image-caption">
                Image {currentImageIndex + 1} of {article.Images.length}
              </p>
            </div>
            <button className="carousel-btn next" onClick={handleNextImage}>
              ›
            </button>
          </div>
        )}

        <div className="tags-section">
          {article.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="link-submission-section">
        <div className="link-submission-content">
          <h3>
            <FaLink /> Submit an Article Link
          </h3>
          <p>Found an similar article? Share it and improve our article!</p>

          <form
            onSubmit={handleLinkSubmission}
            className="link-submission-form"
          >
            <input
              type="url"
              placeholder="Paste article URL here"
              value={submittedLink}
              onChange={(e) => setSubmittedLink(e.target.value)}
              required
              className="link-input"
            />
            <button type="submit" className="submit-link-btn">
              Submit Link
            </button>
          </form>
        </div>
      </div>

      <Comments articleId={article.id} initialComments={article.comments} />
    </article>
  );
};

export default ArticlePage;
