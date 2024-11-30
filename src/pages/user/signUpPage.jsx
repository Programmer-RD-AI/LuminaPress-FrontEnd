import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import logo from '../../assets/images/logo.svg'
import SnackbarComponent from '../../components/snackbar' // Import the custom Snackbar component
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

const SignUpPage = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState({ email: '', password: '' })
  const { show } = useSnackbar()
  const { signUpUser } = useUserAuth()
  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm(setFormErrors, formValues)) {
      show('Invalid form inputs', 'error')
      return
    }

    try {
      signUpUser(
        DOMPurify.sanitize(formValues.email),
        DOMPurify.sanitize(formValues.password)
      )
      show('Registration successful!', 'success')
      setTimeout(() => navigate('/home'), 1500) // Navigate after a delay
    } catch (error) {
      show(error.message || 'Registration failed', 'error')
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
            Sign up for an account
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <TextField
                    name='email'
                    required
                    fullWidth
                    label='Email Address'
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.email)}
                    helperText={formErrors.email}
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <TextField
                    name='password'
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    value={formValues.password}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.password)}
                    helperText={formErrors.password}
                  />
                </motion.div>
              </Grid>
            </Grid>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
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
                Sign Up
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Use the custom Snackbar component */}
      <SnackbarComponent />
    </ThemeProvider>
  )
}

export default SignUpPage
