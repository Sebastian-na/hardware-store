import React from 'react'
import {
  Stepper, Box, Step, StepButton,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Steps({ activeStep = 0 }) {
  const navigate = useNavigate()
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepButton onClick={() => navigate('/login')}>Sign In</StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => navigate('/shipping')}>Shipping</StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => navigate('/payment')}>Payment</StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => navigate('/placeorder')}>Place Order</StepButton>
        </Step>
      </Stepper>
    </Box>
  )
}

export default Steps
