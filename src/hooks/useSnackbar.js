import { useDispatch, useSelector } from 'react-redux'
import { showSnackbar, hideSnackbar } from '../redux/slices/snackbarSlice'

export const useSnackbar = () => {
  const dispatch = useDispatch()

  // Access snackbar state from the Redux store
  const { open, message, severity } = useSelector((state) => state.snackbar)

  // Function to show snackbar with a message and severity
  const show = (message, severity = 'success') => {
    dispatch(showSnackbar({ message, severity }))
  }

  // Function to hide the snackbar
  const hide = () => {
    dispatch(hideSnackbar())
  }

  return {
    open,
    message,
    severity,
    show,
    hide
  }
}
