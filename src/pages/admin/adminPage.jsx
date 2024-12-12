import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/adminSlice";
import "../../styles/pages/AdminPage.css";
import { apiHeader, apiKey, baseUrl } from "../../config/apiConfig";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userData } = useSelector((state) => state.admin);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for API Keys
  const [apiKeys, setApiKeys] = useState([]);
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    environment: "development",
  });

  // State for Configurations
  const [configurations, setConfigurations] = useState([
    {
      id: 1,
      name: "Server Deployment",
      type: "deployment",
      value: "us-west-2",
      status: "active",
    },
    {
      id: 2,
      name: "Feature Flags",
      type: "feature",
      value: "advanced-analytics:true",
      status: "pending",
    },
    {
      id: 3,
      name: "Rate Limiting",
      type: "performance",
      value: "100 req/min",
      status: "active",
    },
  ]);

  const [newConfig, setNewConfig] = useState({
    name: "",
    type: "deployment",
    value: "",
  });

  // Redirect and loading logic
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
    fetchAllArticles();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  // API Key Management
  const generateApiKey = () => {
    if (!newApiKey.name) return; // Prevent empty key generation

    const newKey = {
      id: Date.now(),
      name: newApiKey.name,
      key: `${newApiKey.environment}_${Math.random().toString(36).substring(2, 15)}`,
      environment: newApiKey.environment,
      createdAt: new Date().toISOString(),
    };
    setApiKeys([...apiKeys, newKey]);
    setNewApiKey({ name: "", environment: "development" });
  };

  const deleteApiKey = (id) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  // Configuration Management
  const addConfiguration = () => {
    if (!newConfig.name || !newConfig.value) return; // Prevent empty config

    const config = {
      id: Date.now(),
      ...newConfig,
      status: "pending",
    };
    setConfigurations([...configurations, config]);
    setNewConfig({ name: "", type: "deployment", value: "" });
  };
  // Fetch All Articles
  const fetchAllArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/articles/hide`, {
        method: "GET",
        headers: apiHeader,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Hide Article
  const hideArticle = async (articleId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/articles/hide`, {
        method: "POST",
        headers: {
          ...apiHeader,
          "Content-Type": "application/json", // Ensure content type is JSON
        },
        body: JSON.stringify({ articleId }), // Properly stringify the body
      });
      console.log(await response.json());

      if (!response.ok) {
        throw new Error("Failed to hide article");
      }

      // Update local state
      setArticles(
        articles.map((article) =>
          article.id === articleId ? { ...article, isHidden: true } : article
        )
      );
    } catch (error) {
      console.error("Error hiding article:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Unhide Article
  const unhideArticle = async (articleId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/articles/hide`, {
        method: "PUT",
        headers: {
          ...apiHeader,
          "Content-Type": "application/json", // Ensure content type is JSON
        },
        body: JSON.stringify({ articleId }), // Properly stringify the body
      });
      console.log(await response.json());

      if (!response.ok) {
        throw new Error("Failed to unhide article");
      }

      // Update local state
      setArticles(
        articles.map((article) =>
          article.id === articleId ? { ...article, isHidden: false } : article
        )
      );
    } catch (error) {
      console.error("Error unhiding article:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConfiguration = (id) => {
    setConfigurations(configurations.filter((config) => config.id !== id));
  };

  return (
    <div className="cosmic-admin-container" data-testid="admin-page">
      <div className="cosmic-sidebar">
        <div className="logo">
          <h2>Cosmic Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button data-testid="nav-dashboard" className="nav-item active">
            <i className="icon-dashboard"></i> Dashboard
          </button>
          <button data-testid="nav-api-management" className="nav-item">
            <i className="icon-api"></i> API Management
          </button>
          <button data-testid="nav-configurations" className="nav-item">
            <i className="icon-config"></i> Configurations
          </button>
          <button
            data-testid="nav-logout"
            className="nav-item logout"
            onClick={handleLogout}
          >
            <i className="icon-logout"></i> Logout
          </button>
        </nav>
      </div>

      <main className="cosmic-main-content">
        <header className="cosmic-header">
          <h1 data-testid="admin-header">Admin Control Center</h1>
          <div className="user-profile">
            <span data-testid="user-welcome">
              Welcome, {userData?.email || "Admin"}
            </span>
          </div>
        </header>
        <section
          data-testid="article-management"
          className="cosmic-section article-management"
        >
          <h2>Article Management</h2>
          {isLoading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}

          <div className="articles-list">
            {articles.map((article) => (
              <div key={article.id} className="article-item">
                <div className="article-details">
                  <span className="article-id">ID: {article.id}</span>
                  <span className="article-title">Title: {article.title}</span>
                  <span
                    className={`article-status ${article.isHidden ? "hidden" : "visible"}`}
                  >
                    Status: {article.isHidden ? "Hidden" : "Visible"}
                  </span>
                </div>
                <div className="article-actions">
                  {article.isHidden ? (
                    <button
                      className="btn-unhide"
                      onClick={() => unhideArticle(article.id)}
                      disabled={isLoading}
                    >
                      Unhide
                    </button>
                  ) : (
                    <button
                      className="btn-hide"
                      onClick={() => hideArticle(article.id)}
                      disabled={isLoading}
                    >
                      Hide
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          data-testid="api-management"
          className="cosmic-section api-management"
        >
          <h2>API Key Management</h2>
          <div className="key-generator">
            <input
              data-testid="api-key-name-input"
              type="text"
              placeholder="Key Name"
              value={newApiKey.name}
              onChange={(e) =>
                setNewApiKey({
                  ...newApiKey,
                  name: e.target.value,
                })
              }
            />
            <select
              data-testid="api-key-env-select"
              value={newApiKey.environment}
              onChange={(e) =>
                setNewApiKey({
                  ...newApiKey,
                  environment: e.target.value,
                })
              }
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
            <button data-testid="generate-api-key-btn" onClick={generateApiKey}>
              Generate Key
            </button>
          </div>

          <div data-testid="api-keys-list" className="keys-list">
            {apiKeys.map((key) => (
              <div key={key.id} className="key-item">
                <div className="key-details">
                  <span className="key-name">{key.name}</span>
                  <span className="key-env">{key.environment}</span>
                  <code className="key-value">{key.key}</code>
                </div>
                <button
                  data-testid={`delete-api-key-${key.id}`}
                  className="delete-key"
                  onClick={() => deleteApiKey(key.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          data-testid="configuration-management"
          className="cosmic-section configuration-management"
        >
          <h2>System Configurations</h2>
          <div className="config-generator">
            <input
              data-testid="config-name-input"
              type="text"
              placeholder="Configuration Name"
              value={newConfig.name}
              onChange={(e) =>
                setNewConfig({
                  ...newConfig,
                  name: e.target.value,
                })
              }
            />
            <select
              data-testid="config-type-select"
              value={newConfig.type}
              onChange={(e) =>
                setNewConfig({
                  ...newConfig,
                  type: e.target.value,
                })
              }
            >
              <option value="deployment">Deployment</option>
              <option value="feature">Feature Flag</option>
              <option value="performance">Performance</option>
            </select>
            <input
              data-testid="config-value-input"
              type="text"
              placeholder="Configuration Value"
              value={newConfig.value}
              onChange={(e) =>
                setNewConfig({
                  ...newConfig,
                  value: e.target.value,
                })
              }
            />
            <button data-testid="add-config-btn" onClick={addConfiguration}>
              Add Configuration
            </button>
          </div>

          <div
            data-testid="configurations-list"
            className="configurations-list"
          >
            {configurations.map((config) => (
              <div key={config.id} className="config-item">
                <div className="config-details">
                  <span className="config-name">{config.name}</span>
                  <span className={`config-status ${config.status}`}>
                    {config.status}
                  </span>
                  <span className="config-type">{config.type}</span>
                  <code className="config-value">{config.value}</code>
                </div>
                <button
                  data-testid={`delete-config-${config.id}`}
                  className="delete-config"
                  onClick={() => deleteConfiguration(config.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
