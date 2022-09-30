import { Typography, Container } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Container
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <footer>
        <Typography variant="body2" textAlign="center">Copyright &copy; Hardware</Typography>
      </footer>
    </Container>
  )
}

export default Footer
