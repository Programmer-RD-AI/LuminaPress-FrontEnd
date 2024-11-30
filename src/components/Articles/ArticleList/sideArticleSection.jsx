import PropTypes from "prop-types";
import styles from "../../../styles/components/articlelist.module.scss";

export default function SideArticleSection({
  articles,
  articleType,
  handleReadMore,
}) {
  return (
    <div className={styles.side_article_section}>
      <div className={styles.sidebar_title}>{articleType}</div>
      <div className={styles.news_wrapper}>
        {articles.slice(1, 4).map((article) => (
          <div
            className={styles.news}
            key={article.id}
            onClick={() => handleReadMore(article.id)}
            style={{ marginBottom: "12px" }}
          >
            <div className={styles.news_title}>
              <span>{article.title.substring(0, 100)}...</span>
            </div>
            <div className={styles.news_description}>
              <span>
                {article.description?.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

SideArticleSection.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string, // Optional
    })
  ).isRequired,
  articleType: PropTypes.string.isRequired,
  handleReadMore: PropTypes.func.isRequired,
};
