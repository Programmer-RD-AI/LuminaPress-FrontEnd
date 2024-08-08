import React from 'react'
import { Card, CardContent, Typography, styled } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../assets/styles/ArticleCard.css'

const StyledCard = styled(Card)({
  borderRadius: '0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  maxHeight: '300px'
})

const CardContentStyled = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '8px',
  position: 'absolute',
  bottom: '0',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  transition: 'opacity 0.3s ease',
  opacity: 0,
  overflow: 'hidden'
})

const StyledCardImage = styled('div')({
  width: '100%',
  height: '200px',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
})

const ArticleCard = ({
  title,
  summary,
  category,
  author,
  time,
  image,
  articleId
}) => (
  <Link
    to={`/article/${articleId}`}
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <motion.div className='article-card'>
      <StyledCard>
        <StyledCardImage style={{ backgroundImage: `url(${image})` }} />
        <CardContentStyled className='card-content'>
          <Typography variant='subtitle2' color='text.secondary'>
            {category} | {author} | {time}
          </Typography>
          <Typography variant='h6' component='div' sx={{ mt: 1 }}>
            {title}
          </Typography>
          <Typography variant='body2' sx={{ mt: 1 }}>
            {summary}
          </Typography>
        </CardContentStyled>
      </StyledCard>
    </motion.div>
  </Link>
)

export default ArticleCard
