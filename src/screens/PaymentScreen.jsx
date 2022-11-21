import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button, Grid, Typography, FormControl, FormControlLabel, RadioGroup, FormLabel, Radio,
} from '@mui/material'
import Steps from '../components/Steps'
import { savePaymentMethod } from '../reducers/cartReducer'

function PaymentScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if (!shippingAddress.address) {
    navigate('/shipping')
  }

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <Grid container mt={2} spacing={5} justifyContent="center">
      <Grid item xs={12}>
        <Steps activeStep={2} />
      </Grid>
      <Grid item xs={12}>
        <Typography component="h1" variant="h2" align="center">Payment</Typography>
      </Grid>
      <Grid item xs={12} md={6} textAlign="center">
        <FormControl>
          <FormLabel id="payment_label">Payment method</FormLabel>
          <RadioGroup
            aria-labelledby="payment_label"
            defaultValue="PayPal"
            name="radio-buttons-group"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="PayPal" control={<Radio />} label="Paypal" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  )
}

export default PaymentScreen
