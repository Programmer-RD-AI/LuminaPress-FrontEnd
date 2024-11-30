// Comments.jsx
import { useState } from 'react'
import '../../styles/components/Comments.css'
import { formatDate } from '../../utils/formatDate'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { addComment } from '../../API/articles/comments/addComment'
import DOMPurify from 'dompurify'

const Comments = ({ articleId, initialComments }) => {
  const [comment, setComment] = useState('')
  const { user: userId } = useUserAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [comments, setComments] = useState(initialComments)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = addComment(
        articleId,
        userId,
        DOMPurify.sanitize(comment)
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to post comment')
      }

      setComments(data.comments)
      setComment('')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='engagement-section'>
      <div className='engagement-header'>
        <h3>Join the Discussion</h3>
        <span className='comment-count'>{comments.length} comments</span>
      </div>

      <div className='comment-box'>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Share your thoughts...'
            className='comment-input'
          />
          {error && <div className='error-message'>{error}</div>}
          <button
            type='submit'
            className='submit-button'
            disabled={isSubmitting || !comment.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      <div className='comments-list'>
        {comments.map((comment) => (
          <div key={comment.id} className='comment-item'>
            <div className='comment-author'>
              <img
                src={comment.userImage}
                alt={comment.userName}
                className='author-image'
              />
              <div className='author-info'>
                <h4>{comment.userName}</h4>
                <span className='comment-date'>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            </div>
            <p className='comment-text'>{comment.comment}</p>
            <div className='comment-actions'>
              <button className='like-button'>
                <svg
                  className='heart-icon'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                </svg>
                <span>{comment.likes}</span>
              </button>
              <button className='reply-button'>Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
