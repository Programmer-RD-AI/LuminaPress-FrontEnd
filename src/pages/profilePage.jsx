import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  Lock,
  Unlock,
  Eye,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import "../styles/components/ProfilePage.css";
import { apiHeader, baseUrl } from "../config/apiConfig";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("articles");

  const currentUserId = useSelector((state) => state.auth.user);
  console.log(currentUserId);
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
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);

        const articlesPromises = data.viewedArticles.map((articleId) =>
          fetch(`${baseUrl}/articles?articleId=${articleId}`, {
            headers: apiHeader,
          }).then((res) => res.json())
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

  if (loading)
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="profile-error">
        <h2>Error loading profile</h2>
        <p>{error}</p>
      </div>
    );

  if (!profile)
    return (
      <div className="profile-not-found">
        <h2>Profile not found</h2>
        <p>The requested profile does not exist or is private.</p>
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${profile.email}`}
            alt="Profile avatar"
          />
        </div>
        <div className="profile-info">
          <h1>{profile.email}</h1>
          {currentUserId === userId && (
            <button className="privacy-toggle" onClick={togglePrivacy}>
              {profile.private ? (
                <>
                  <Lock className="icon" /> Private
                </>
              ) : (
                <>
                  <Unlock className="icon" /> Public
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <BookOpen className="icon" />
          <div className="stat-info">
            <h3>{articles.length}</h3>
            <p>Articles Read</p>
          </div>
        </div>
        <div className="stat-card">
          <MessageSquare className="icon" />
          <div className="stat-info">
            <h3>{profile.commentedArticles?.length || 0}</h3>
            <p>Articles Commented</p>
          </div>
        </div>
        <div className="stat-card">
          <Eye className="icon" />
          <div className="stat-info">
            <h3>{profile.viewedArticles?.length || 0}</h3>
            <p>Total Views</p>
          </div>
        </div>
      </div>

      <div className="content-tabs">
        <button
          className={`tab-button ${activeTab === "articles" ? "active" : ""}`}
          onClick={() => setActiveTab("articles")}
        >
          Recent Reads
        </button>
        <button
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
      </div>

      {activeTab === "articles" ? (
        <div className="articles-section">
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="article-meta">
                  <span>
                    {new Date(article.view_history[0]).toLocaleDateString()}
                  </span>
                  <span>{article.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="comments-section">
          {profile.commentedArticles?.map((article) => (
            <div key={article.articleId} className="comment-article-group">
              <h3 className="article-title">{article.articleTitle}</h3>
              {article.comments.map((comment, index) => (
                <div key={index} className="comment-card">
                  <p>{comment.content}</p>
                  <div className="comment-meta">
                    <span>
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                    <span className="likes">
                      <ThumbsUp className="icon" size={14} />
                      {comment.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
