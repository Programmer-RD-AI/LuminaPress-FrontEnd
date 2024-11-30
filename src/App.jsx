import React, { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/navbar'
import HomePage from './pages/homePage'
import Footer from './components/footer'
import AboutUsPage from './pages/aboutUsPage'
import ContactUsPage from './pages/contactUsPage'
import NotFoundPage from './pages/notFoundPage'
import ProfilePage from './pages/profilePage'
import ArticlePage from './pages/articles/articlePage'
import AdminLogin from './pages/admin/adminLogin'
import AdminPage from './pages/admin/adminPage'
import LoginPage from './pages/user/loginPage'
import SignUpPage from './pages/user/signUpPage'
import { useSelector } from 'react-redux'
import LoadingPage from './components/Loading/loader'
import SnackbarComponent from './components/snackbar'
import './config/posthogConfig.js'
import { useTheme } from './hooks/useTheme'
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff'
    },
    background: {
      default: '#000000',
      paper: '#121212'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0'
    }
  }
})

const App = () => {
  const isLoading = useSelector((state) => state.loader.loading)
  const { themeMode } = useTheme()

  // // Create dynamic theme based on mode
  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode: themeMode,
  //         ...(themeMode === "dark"
  //           ? {
  //               primary: { main: "#ffffff" },
  //               background: {
  //                 default: "#121212",
  //                 paper: "#1e1e1e",
  //               },
  //               text: {
  //                 primary: "#ffffff",
  //                 secondary: "#b0b0b0",
  //               },
  //             }
  //           : {
  //               primary: { main: "#1976d2" },
  //               background: {
  //                 default: "#f4f4f4",
  //                 paper: "#ffffff",
  //               },
  //               text: {
  //                 primary: "#000000",
  //                 secondary: "#666666",
  //               },
  //             }),
  //       },
  //     }),
  //   [themeMode]
  // );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading && <LoadingPage isLoading={isLoading} />}
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/a/:articleId' element={<ArticlePage />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/contact' element={<ContactUsPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/p/:userId' element={<ProfilePage />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/' element={<AdminPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <SnackbarComponent />
    </ThemeProvider>
  )
}

export default App
