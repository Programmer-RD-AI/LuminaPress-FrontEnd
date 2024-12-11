import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, Trash2, BookOpen } from "lucide-react";
import "../styles/components/ProfilePage.css";
import { apiHeader, baseUrl } from "../config/apiConfig";
import {
  addBookmark,
  removeBookmark,
  clearBookmarks,
} from "../redux/slices/bookmarkSlice.js";

export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("articles");

  // Get bookmarked article IDs from Redux store
  const bookmarkedArticleIds = useSelector(
    (state) => state.bookmarks.articleIds,
  );

  const currentUserId = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/profile?userIdAccessing=${userId}&currentUserId=${currentUserId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...apiHeader,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);

        const articlesPromises = data.viewedArticles.map((articleId) =>
          fetch(`${baseUrl}/articles/article?articleId=${articleId}`, {
            headers: apiHeader,
          }).then((res) => res.json()),
        );

        const articlesData = await Promise.all(articlesPromises);
        setArticles(articlesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, currentUserId]);

  const togglePrivacy = async () => {
    try {
      const response = await fetch(`${baseUrl}/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...apiHeader,
        },
        body: JSON.stringify({
          userId: currentUserId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update privacy settings");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBookmarkToggle = (article) => {
    if (bookmarkedArticleIds.includes(article.id)) {
      dispatch(removeBookmark(article.id));
    } else {
      dispatch(addBookmark(article.id));
    }
  };

  const handleClearBookmarks = () => {
    dispatch(clearBookmarks());
  };

  const handleArticleClick = (articleId) => {
    navigate(`/a/${articleId}`);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <h2>Error loading profile</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-not-found">
        <h2>Profile not found</h2>
        <p>The requested profile does not exist or is private.</p>
      </div>
    );
  }

  return (
    <div className="profile-universe">
      <div className="profile-container">
        <div className="profile-header">
          <div className="cosmic-avatar">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${profile.email}`}
              alt="Profile avatar"
              className="avatar-image"
            />
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{profile.email.split("@")[0]}</h1>
            <button className="profile-meta" onClick={togglePrivacy}>
              {profile.private ? (
                <span className="privacy-badge private">Private Profile</span>
              ) : (
                <span className="privacy-badge public">Public Profile</span>
              )}
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <h3>{articles.length}</h3>
              <p>Articles Read</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Comments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👀</div>
            <div className="stat-content">
              <h3>{articles.length}</h3>
              <p>Total Views</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === "articles" ? "active" : ""}`}
              onClick={() => setActiveTab("articles")}
            >
              Recent Reads
            </button>
            <button
              className={`tab-btn ${activeTab === "bookmarks" ? "active" : ""}`}
              onClick={() => setActiveTab("bookmarks")}
            >
              Bookmarks
            </button>
            <button
              className={`tab-btn ${activeTab === "comments" ? "active" : ""}`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </button>
          </div>

          <div className="content-display">
            {activeTab === "articles" && (
              <div className="articles-grid">
                {articles.map((article) => (
                  <div key={article.id} className="article-card">
                    <div className="article-card-header">
                      <h3 onClick={() => handleArticleClick(article.id)}>
                        {article.title}
                      </h3>
                      <button
                        className="bookmark-btn"
                        onClick={() => handleBookmarkToggle(article)}
                      >
                        <Bookmark
                          color={
                            bookmarkedArticleIds.includes(article.id)
                              ? "yellow"
                              : "gray"
                          }
                          fill={
                            bookmarkedArticleIds.includes(article.id)
                              ? "yellow"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                    <p>{article.description}</p>
                    <div className="article-meta">
                      <span>{article.views} Views</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "bookmarks" && (
              <div className="bookmarks-section">
                {bookmarkedArticleIds.length === 0 ? (
                  <div className="empty-state">
                    <BookOpen size={48} />
                    <p>No bookmarks yet. Start exploring!</p>
                  </div>
                ) : (
                  <>
                    <div className="bookmarks-header">
                      <h3>Bookmarked Articles</h3>
                      <button
                        className="clear-bookmarks-btn"
                        onClick={handleClearBookmarks}
                      >
                        <Trash2 /> Clear All
                      </button>
                    </div>
                    <div className="articles-grid">
                      {articles
                        .filter((article) =>
                          bookmarkedArticleIds.includes(article.id),
                        )
                        .map((article) => (
                          <div key={article.id} className="article-card">
                            <div className="article-card-header">
                              <h3
                                onClick={() => handleArticleClick(article.id)}
                              >
                                {article.title}
                              </h3>
                              <button
                                className="bookmark-btn"
                                onClick={() => handleBookmarkToggle(article)}
                              >
                                <Bookmark color="yellow" fill="yellow" />
                              </button>
                            </div>
                            <p>{article.description}</p>
                            <div className="article-meta">
                              <span>{article.views} Views</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "comments" && (
              <div className="empty-state">
                <p>No comments yet. Start exploring!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
