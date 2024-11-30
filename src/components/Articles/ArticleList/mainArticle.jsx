import PropTypes from "prop-types";
import styles from "../../../styles/components/articlelist.module.scss";

const MainArticle = ({ article, highestResImage, handleReadMore }) => {
  if (!article) return null;

  return (
    <div className={styles.main_article}>
      <div className={styles.img_wrapper}>
        {highestResImage && <img src={highestResImage} alt="thumbnail" />}
      </div>
      <div className={styles.text_wrapper}>
        <div
          className={styles.title}
          onClick={() => handleReadMore(article.id)}
        >
          {article.title.substring(0, 100)}...
        </div>
        <div className={styles.text}>
          <p>{article.description?.substring(0, 100)}...</p>
          <div className={styles.btn_wrapper}>
            <span
              className={styles.btn}
              onClick={() => handleReadMore(article.id)}
            >
              READ MORE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

MainArticle.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  highestResImage: PropTypes.string,
  handleReadMore: PropTypes.func.isRequired,
};

export default MainArticle;
