import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { hideSnackbar } from '../redux/slices/snackbarSlice'
import { Slide } from '@mui/material' // Adding slide transition for smooth pop-up effect
import { useSnackbar } from '../hooks/useSnackbar'

// Alert component using MuiAlert for consistent design
const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const SnackbarComponent = () => {
  const { open, message, severity, _, hide } = useSnackbar()

  // Determine background color based on severity with slight transparency
  const getBackgroundColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'rgba(76, 175, 80, 0.7)' // Green with slight transparency for success
      case 'info':
        return 'rgba(33, 150, 243, 0.7)' // Blue with slight transparency for info
      case 'warning':
        return 'rgba(255, 193, 7, 0.7)' // Yellow with slight transparency for warning
      case 'error':
        return 'rgba(211, 47, 47, 0.7)' // Red with slight transparency for error
      default:
        return 'rgba(76, 175, 80, 0.7)' // Default to success with slight transparency
    }
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={hide}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Positioning on the right side
      TransitionComponent={Slide} // Adding transition effect
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: getBackgroundColor(severity), // Dynamic background color based on severity
          borderRadius: '10px', // Subtle rounded corners for a modern look
          boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.1)', // Subtle shadow for a clean effect
          padding: '8px 16px', // Reduced padding for minimalism
          maxWidth: '320px', // Compact width for a sleek design
          fontWeight: '500', // Slightly bold text for futuristic look
          fontSize: '14px' // Smaller font size for a minimalist feel
        }
      }}
    >
      <Alert onClose={hide} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
