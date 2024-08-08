// src/pages/AboutUsPage.js
import React from 'react'
import { Container, Typography, Grid, Paper, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Fade from '@mui/material/Fade'
import Grow from '@mui/material/Grow'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const AboutUsPage = () => (
  <Container>
    <Typography variant='h1' gutterBottom align='center' color='primary'>
      About Us
    </Typography>
    <Fade in timeout={1000}>
      <Typography variant='h4' paragraph align='center'>
        Welcome to our platform!
      </Typography>
    </Fade>
    <Grow in timeout={1500}>
      <Typography variant='body1' paragraph>
        We are a team of passionate individuals committed to bringing you the
        best content. Our mission is to provide valuable information and
        resources on various topics. Our team consists of experts in diverse
        fields, working together to deliver high-quality content and insightful
        perspectives.
      </Typography>
    </Grow>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Item>
          <Typography variant='h6' gutterBottom>
            Our Vision
          </Typography>
          <Typography variant='body2'>
            To be a leading source of knowledge and inspiration, empowering
            individuals through valuable content and engaging resources.
          </Typography>
        </Item>
      </Grid>
      <Grid item xs={12} md={4}>
        <Item>
          <Typography variant='h6' gutterBottom>
            Our Mission
          </Typography>
          <Typography variant='body2'>
            To deliver high-quality information and resources that enhance
            learning and growth, fostering a community of informed and empowered
            individuals.
          </Typography>
        </Item>
      </Grid>
      <Grid item xs={12} md={4}>
        <Item>
          <Typography variant='h6' gutterBottom>
            Our Values
          </Typography>
          <Typography variant='body2'>
            Integrity, Excellence, Innovation, and Community. We uphold these
            values in every aspect of our work, striving to exceed expectations
            and drive positive change.
          </Typography>
        </Item>
      </Grid>
    </Grid>
    <Box mt={4} textAlign='center'>
      <Typography variant='h5' gutterBottom>
        Meet Our Team
      </Typography>
      <Typography variant='body1'>
        Our dedicated team brings a wealth of experience and expertise to our
        platform. We are committed to continuous improvement and innovation to
        better serve our community.
      </Typography>
    </Box>
  </Container>
)

export default AboutUsPage
