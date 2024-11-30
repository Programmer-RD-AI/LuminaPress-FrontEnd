import React, { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Fade from '@mui/material/Fade'
import Zoom from '@mui/material/Zoom'
import styles from '../styles/pages/contactUsPage.module.css'

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: 'linear-gradient(to bottom, #1e1e1e, #121212)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 1px 8px rgba(255,255,255,0.05)',
  borderRadius: '20px',
  border: '1px solid #333333'
}))

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <Container className={styles.contactContainer}>
      <Fade in timeout={1000}>
        <Typography
          variant='h2'
          align='center'
          gutterBottom
          className={styles.pageTitle}
        >
          Contact Us
        </Typography>
      </Fade>

      <Zoom in timeout={1500}>
        <FormContainer elevation={0} className={styles.formContainer}>
          <Typography variant='h5' gutterBottom className={styles.subtitleText}>
            We'd Love to Hear From You
          </Typography>

          <Typography variant='body1' paragraph className={styles.introText}>
            Have a question, suggestion, or just want to say hello? Fill out the
            form below, and we'll get back to you soon.
          </Typography>
          <center>
            {' '}
            <form
              onSubmit={handleSubmit}
              style={{ width: '100%' }}
              className={styles.contactForm}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='name'
                    label='Name'
                    fullWidth
                    margin='normal'
                    required
                    variant='outlined'
                    placeholder='Your Name'
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.textField}
                    InputLabelProps={{
                      className: styles.inputLabel
                    }}
                    InputProps={{
                      className: styles.inputField
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='email'
                    label='Email'
                    type='email'
                    fullWidth
                    margin='normal'
                    required
                    variant='outlined'
                    placeholder='your@email.com'
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.textField}
                    InputLabelProps={{
                      className: styles.inputLabel
                    }}
                    InputProps={{
                      className: styles.inputField
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='message'
                    label='Message'
                    multiline
                    rows={6}
                    fullWidth
                    margin='normal'
                    required
                    variant='outlined'
                    placeholder='Your message...'
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textField}
                    InputLabelProps={{
                      className: styles.inputLabel
                    }}
                    InputProps={{
                      className: styles.inputField
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    className={styles.submitButton}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </center>
        </FormContainer>
      </Zoom>
    </Container>
  )
}

export default ContactUsPage
