import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/components/articlelist.module.scss'
import MainArticle from './mainArticle'
import SubArticles from './subArticle'
import SideArticleSection from './sideArticleSection'
import { getHighestResolutionImage } from '../../../utils/getHighestResolutionImage'
import { useArticles } from '../../../hooks/useArticles'

export default function ArticleList () {
  // const dispatch = useDispatch();
  const navigate = useNavigate()

  // Select state from the Redux store
  const { articles, articleType } = useArticles()

  const handleReadMore = (articleId) => {
    navigate(`/a/${articleId}`)
  }

  const highestResImage =
    articles.length > 0 && articles[0].Images
      ? getHighestResolutionImage(articles[0].Images)
      : null

  const isArray = Array.isArray(articles)

  return (
    <div className={styles.article_list}>
      <div className={styles.wrapper}>
        <div className={styles.left_side}>
          {/* Main Article */}
          {articles[0] && (
            <MainArticle
              article={articles[0]}
              highestResImage={highestResImage}
              handleReadMore={handleReadMore}
            />
          )}
        </div>
        <div className={styles.right_side_wrapper}>
          <div className={styles.right_side}>
            {isArray && (
              <SideArticleSection
                articles={articles}
                articleType={articleType}
                handleReadMore={handleReadMore}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sub_articles_section_wrapper}>
          <SubArticles
            articles={articles.slice(4)} // Pass only the sub-articles (after the main and side articles)
            handleReadMore={handleReadMore}
          />
        </div>
      </div>
    </div>
  )
}
