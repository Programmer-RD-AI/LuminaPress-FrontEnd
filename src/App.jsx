// src/App.js
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import ArticlePage from './pages/ArticlePage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

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

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/article/:articleId' element={<ArticlePage />} />
      <Route path='/about' element={<AboutUsPage />} />
      <Route path='/contact' element={<ContactUsPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
    <Footer />
  </ThemeProvider>
)

export default App
