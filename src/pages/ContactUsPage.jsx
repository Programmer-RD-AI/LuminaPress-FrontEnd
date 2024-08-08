// src/pages/ContactUsPage.js
import React from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Fade from '@mui/material/Fade'
import Zoom from '@mui/material/Zoom'

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center'
}))

const ContactUsPage = () => (
  <Container>
    <Fade in timeout={1000}>
      <Typography variant='h1' align='center' gutterBottom color='primary'>
        Contact Us
      </Typography>
    </Fade>
    <Zoom in timeout={1500}>
      <FormContainer>
        <Typography variant='h5' gutterBottom>
          We would love to hear from you!
        </Typography>
        <Typography variant='body1' paragraph>
          Whether you have questions, feedback, or just want to say hello, feel
          free to reach out to us using the form below. Our team is here to
          assist you and will get back to you as soon as possible.
        </Typography>
        <form style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label='Name'
                fullWidth
                margin='normal'
                required
                variant='outlined'
                placeholder='John Doe'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label='Email'
                type='email'
                fullWidth
                margin='normal'
                required
                variant='outlined'
                placeholder='john.doe@example.com'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Message'
                multiline
                rows={6}
                fullWidth
                margin='normal'
                required
                variant='outlined'
                placeholder='Your message here...'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                style={{ marginTop: '16px' }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </Zoom>
    <Box mt={4} textAlign='center'>
      <Typography variant='h6' gutterBottom>
        Follow us on social media
      </Typography>
      <Typography variant='body2'>
        Stay connected and follow us on our social media channels for the latest
        updates and news.
      </Typography>
    </Box>
  </Container>
)

export default ContactUsPage
