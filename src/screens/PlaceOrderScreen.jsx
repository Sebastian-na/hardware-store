import React from 'react'
import {
  Grid, Button, Card, Typography, Divider, Link, CardContent, CardActions,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'material-ui-image'
import Steps from '../components/Steps'
import format from '../utils/currencyFormatter'

function PlaceOrderScreen() {
  const cartState = useSelector((state) => state.cart)
  const { cart } = cartState
  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
  const taxPrice = Number(0.15 * itemsPrice).toFixed(2)
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
  return (
    <Grid container mt={2} spacing={5}>
      <Grid item xs={12}>
        <Steps activeStep={3} />
      </Grid>
      <Grid item xs={12}>
        <Typography component="h1" variant="h2" align="center">Place order</Typography>
      </Grid>
      <Grid container item xs={12} md={8} spacing={5}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }} variant="outlined">
            <Typography component="h2" variant="h4">Shipping</Typography>
            <Typography component="p" variant="body1">
              {cartState.shippingAddress.address}
              ,
              {' '}
              {cartState.shippingAddress.city}
              ,
              {' '}
              {cartState.shippingAddress.postalCode}
              ,
              {' '}
              {cartState.shippingAddress.country}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }} variant="outlined">
            <Typography component="h2" variant="h4">Payment method</Typography>
            <Typography component="p" variant="body1">
              Method:
              {' '}
              {cartState.paymentMethod}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }} variant="outlined">
            <Typography component="h2" variant="h4">Order items</Typography>
            <Grid container spacing={2} mt={1}>
              {cart.map((product, idx) => (
                <Grid item container xs={12} key={product.id} spacing={1} alignItems="center" justifyContent="space-between">
                  <Grid item xs={1}>
                    <Image
                      src={product.image}
                      alt={product.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="center">
                      <Link
                        to={`/product/${product.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {product.name}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2" align="center">
                      {' '}
                      {product.qty}
                      {' '}
                      X
                      {' '}
                      {format(product.price)}
                      {' '}
                      =
                      {' '}
                      {format(product.price * product.qty)}
                    </Typography>
                  </Grid>
                  {idx !== cart.length - 1 && (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  )}

                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }} variant="outlined">
            <CardContent>
              <Typography component="h2" variant="h4">Order summary</Typography>

              <Grid container spacing={3} mt={1}>
                <Grid item xs={12}>
                  <Typography variant="body1" mb={1}>
                    Items:
                    {' '}
                    {format(itemsPrice)}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" mb={1}>
                    Shipping:
                    {' '}
                    {format(shippingPrice)}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" mb={1}>
                    Tax:
                    {' '}
                    {format(taxPrice)}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" mb={1}>
                    Total:
                    {' '}
                    {format(totalPrice)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" fullWidth size="large">Place order</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default PlaceOrderScreen
