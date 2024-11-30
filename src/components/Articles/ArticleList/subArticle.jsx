import PropTypes from "prop-types";
import styles from "../../../styles/components/articlelist.module.scss";

export default function SubArticles({ articles, handleReadMore }) {
  return (
    <div className={styles.sub_articles_section}>
      {articles.length > 0 &&
        articles.map((article) => (
          <div
            className={styles.sub_article}
            key={article.id}
            onClick={() => handleReadMore(article.id)}
          >
            <div className={styles.image_wrapper}>
              <img
                src={article.Images[0] || "/placeholder.jpg"} // Fallback for missing images
              />
            </div>
            <div className={styles.content_wrapper}>
              <div className={styles.sub_article_title}>{article.title.substring(0, 100)}...</div>
              <p className={styles.sub_article_description}>
                {article.description?.substring(0, 100)}...
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

SubArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  handleReadMore: PropTypes.func.isRequired,
};
