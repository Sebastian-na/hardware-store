import {
  FormControl, Button, Typography, Input, InputLabel, FormHelperText, Grid,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingAddress } from '../reducers/cartReducer'
import Steps from '../components/Steps'

function ShippingScreen() {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleContinue = () => {
    dispatch(saveShippingAddress({
      address, city, postalCode, country,
    }))
    navigate('/payment')
  }

  return (
    <Grid container spacing={5} justifyContent="center" mt={2}>
      <Grid item xs={12}>
        <Steps activeStep={1} />
      </Grid>

      <Grid item xs={12}>
        <Typography component="h1" variant="h2" align="center">Shipping</Typography>
      </Grid>

      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="address">Address</InputLabel>
          <Input
            id="address"
            name="address"
            value={address || ''}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormHelperText>Enter your address</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="city">City</InputLabel>
          <Input
            id="city"
            name="city"
            value={city || ''}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormHelperText>Enter your city</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
          <Input
            id="postalCode"
            name="postalCode"
            value={postalCode || ''}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <FormHelperText>Enter your postal code</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="country">Country</InputLabel>
          <Input
            id="country"
            name="country"
            value={country || ''}
            onChange={(e) => setCountry(e.target.value)}
          />
          <FormHelperText>Enter your country</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button
          variant="contained"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Grid>

    </Grid>
  )
}

export default ShippingScreen
