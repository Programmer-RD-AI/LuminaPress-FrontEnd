import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../redux/slices/adminSlice'

export const useAdminAuth = () => {
  const dispatch = useDispatch()

  // Use selector to access authentication-related state
  const { isAuthenticated, userData } = useSelector((state) => state.admin)

  // Handle login action
  const loginAdmin = (userData) => {
    dispatch(login(userData)) // Dispatch login action
  }

  // Handle logout action
  const logoutAdmin = () => {
    dispatch(logout()) // Dispatch logout action
  }

  return {
    isAuthenticated,
    userData,
    loginAdmin,
    logoutAdmin
  }
}
