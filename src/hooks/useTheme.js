// useTheme.js
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, toggleTheme } from '../redux/slices/themeSlice'

// Custom hook for theme management
export const useTheme = () => {
  const dispatch = useDispatch()

  // Safely access the theme mode with a default
  const themeMode = useSelector((state) => state?.theme?.mode || 'dark')

  // Toggle between dark and light modes
  const themeToggle = () => {
    dispatch(toggleTheme())
  }

  // Set theme to a specific mode
  const themeSet = (mode) => {
    dispatch(setTheme(mode))
  }

  // Check if current theme is dark
  const isDarkMode = themeMode === 'dark'

  return {
    mode: themeMode,
    isDarkMode,
    themeToggle,
    themeSet
  }
}
