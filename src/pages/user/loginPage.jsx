import { useState } from 'react'
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { validateForm } from '../../utils/validateForm'
import { useSnackbar } from '../../hooks/useSnackbar'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import DOMPurify from 'dompurify'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' },
    background: { default: '#0d1117' },
    text: { primary: '#ffffff', secondary: '#b3b3b3' }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: { fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.5 }
  }
})

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState({ email: '', password: '' })
  const { show } = useSnackbar()
  const { signInUser } = useUserAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm(setFormErrors, formValues)) {
      try {
        signInUser(
          DOMPurify.sanitize(formValues.email),
          DOMPurify.sanitize(formValues.password)
        )
        show('Login successful!', 'success')
        setTimeout(() => navigate('/'), 1500)
      } catch (error) {
        show(error.message || 'An error occurred. Please try again.', 'error')
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#1e293b',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            width: '100%'
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={logo}
              alt='Logo'
              style={{
                width: '120px',
                marginBottom: '20px'
              }}
            />
          </motion.div>
          <Typography
            component='h1'
            variant='h5'
            align='center'
            sx={{ marginBottom: '20px' }}
          >
            Log in to your account
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name='email'
                  required
                  fullWidth
                  label='Email Address'
                  value={formValues.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='password'
                  required
                  fullWidth
                  label='Password'
                  type='password'
                  value={formValues.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#2563eb',
                '&:hover': { backgroundColor: '#1d4ed8' }
              }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginPage
