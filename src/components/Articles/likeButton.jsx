import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import '../../styles/components/LikeButton.css'
import PropTypes from 'prop-types'
import { likeArticle } from '../../API/articles/likeArticle.js'
import { useSnackbar } from '../../hooks/useSnackbar.js'
import { useUserAuth } from '../../hooks/Auth/useUserAuth.js'

const LikeButton = ({ articleId, likes: initialLikes, liked_by }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const navigate = useNavigate()
  const { show } = useSnackbar()
  const { user: userId } = useUserAuth()

  useEffect(() => {
    if (liked_by.includes(userId)) {
      setIsLiked(true)
    }
  }, [userId, liked_by])

  const handleLikeClick = async () => {
    if (!userId) {
      show('Please sign up to like articles', 'info')
      navigate('/signup')
      return
    }

    try {
      const data = await likeArticle(userId, articleId, isLiked)
      setIsLiked(!isLiked)
      setLikeCount(data.likes)
      show(data.message, 'success')
    } catch (error) {
      show('Failed to update article like status', 'error')
    }
  }

  return (
    <button
      onClick={handleLikeClick}
      className={`like-button ${isLiked ? 'liked' : ''}`}
      aria-label={isLiked ? 'Unlike article' : 'Like article'}
    >
      <Heart
        className={`heart-icon ${isLiked ? 'heart-filled' : ''}`}
        size={20}
      />
      <span className='like-count'>{likeCount}</span>
    </button>
  )
}

LikeButton.propTypes = {
  articleId: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  liked_by: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default LikeButton
