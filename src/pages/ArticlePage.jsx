import { useParams, Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
  Chip,
  Paper
} from '@mui/material'
import Navbar from '../components/Navbar'
import { articles } from '../data/articles' // Ensure this path is correct
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'

// Styled components
const ArticleImage = styled('img')({
  width: '100%',
  maxHeight: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
})

const SimilarArticleCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '350px',
  width: '280px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '8px',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
  }
})

const SimilarArticleImage = styled('div')({
  width: '100%',
  height: '200px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '4px 4px 0 0'
})

const SimilarArticleContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '16px'
})

const ArticleDescription = styled(Typography)({
  fontSize: '1.4rem',
  lineHeight: '1.8',
  marginTop: '1rem',
  backdropFilter: 'blur(10px)',
  padding: '10px',
  borderRadius: '8px'
})

const SimilarArticlesContainer = styled(Paper)({
  padding: '16px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  position: 'relative',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  overflowX: 'hidden'
})

const StyledContainer = styled(Container)({
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  borderRadius: '8px',
  padding: '24px',
  marginTop: '0'
})

const ArticlePage = () => {
  const { articleId } = useParams()
  const article = articles.find((art) => art.articleId === parseInt(articleId))

  // Get random similar articles
  const similarArticles = articles
    .filter((art) => art.articleId !== parseInt(articleId))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  if (!article) {
    return <Typography variant='h6'>Article not found</Typography>
  }

  const tags = article.tags || []

  const splitDescription = (text) => {
    const parts = text
      .split('\n')
      .map((part, index) => (
        <ArticleDescription key={index}>{part}</ArticleDescription>
      ))
    return parts
  }

  const getFirstWords = (text, numWords) => {
    const words = text.split(' ').slice(0, numWords).join(' ')
    return words + (text.split(' ').length > numWords ? '...' : '')
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          background: 'linear-gradient(45deg, #000, #666, #fff)',
          backgroundSize: '600% 600%',
          animation: 'gradientAnimation 15s ease infinite',
          minHeight: '100vh',
          paddingBottom: '4rem'
        }}
      >
        <StyledContainer maxWidth='lg'>
          <Box
            mt={4}
            mb={4}
            sx={{
              borderRadius: '8px',
              color: '#fff'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  boxShadow: 'none',
                  borderRadius: '8px',
                  backgroundColor: 'transparent'
                }}
              >
                <CardContent>
                  <Typography variant='h3' component='h1' gutterBottom>
                    {getFirstWords(article.title, 5)}
                  </Typography>

                  <Box display='flex' alignItems='center' mb={2}>
                    <Avatar
                      alt={article.author}
                      src={article.authorAvatar}
                      sx={{ mr: 1 }}
                    />
                    <Typography variant='subtitle1' color='text.secondary'>
                      {article.author} | {article.time}
                    </Typography>
                  </Box>

                  <ArticleImage src={article.image} alt={article.title} />

                  <Box mt={2}>
                    {tags.length > 0
                      ? (
                          tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              sx={{
                                mr: 1,
                                mb: 1,
                                color: '#fff',
                                backgroundColor: '#333'
                              }}
                            />
                          ))
                        )
                      : (
                        <Typography variant='body2' color='text.secondary'>
                          No tags available
                        </Typography>
                        )}
                  </Box>

                  <Typography variant='h6' mt={2}>
                    {article.summary}
                  </Typography>

                  {splitDescription(article.description)}
                </CardContent>
              </Card>
            </motion.div>

            <Box mt={4}>
              <Typography variant='h5' component='h2' gutterBottom>
                Similar Articles
              </Typography>
              <SimilarArticlesContainer>
                {similarArticles.map((similarArticle) => (
                  <Link
                    key={similarArticle.articleId}
                    to={`/articles/${similarArticle.articleId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <SimilarArticleCard>
                      <SimilarArticleImage
                        style={{
                          backgroundImage: `url(${similarArticle.image})`,
                          height: '200px',
                          width: '100%'
                        }}
                      />
                      <SimilarArticleContent>
                        <Typography variant='h6'>
                          {getFirstWords(similarArticle.title, 5)}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          mt={1}
                        >
                          {getFirstWords(similarArticle.summary, 10)}
                        </Typography>
                      </SimilarArticleContent>
                    </SimilarArticleCard>
                  </Link>
                ))}
              </SimilarArticlesContainer>
            </Box>
          </Box>
        </StyledContainer>
      </Box>
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
        `}
      </style>
    </>
  )
}

export default ArticlePage
