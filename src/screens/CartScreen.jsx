import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link, useNavigate, useParams, useSearchParams,
} from 'react-router-dom'
import {
  Grid, Divider, Typography, FormControl, Select, MenuItem, IconButton, Card, CardContent,
  CardActions, Button,
} from '@mui/material'
import Image from 'material-ui-image'
import DeleteIcon from '@mui/icons-material/Delete'
import { addToCart, removeFromCart } from '../reducers/cartReducer'

function CartScreen() {
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cart)
  const userLoginState = useSelector((state) => state.userLogin)
  const { isLoggedIn } = userLoginState
  const { cart } = cartState
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const qty = searchParams.get('qty')
      dispatch(addToCart({ productId: id, qty }))
    }
  }, [id, searchParams])

  const removeHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const checkoutHandler = () => {
    if (isLoggedIn) {
      navigate('/shipping')
    } else {
      navigate('/login/?redirect=shipping')
    }
  }

  return (
    <Grid container mt={8} spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4">SHOPPING CART</Typography>
      </Grid>

      <Grid item xs={12} md={8} mt={4}>
        <Grid container spacing={2}>
          {cart.map((product) => (
            <Grid item xs={12} key={product.id}>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                <Grid item xs={2} sm={2}>
                  <Image
                    src={product.image}
                    alt={product.name}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>

                  <Typography variant="h6" align="center">
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {product.name}
                    </Link>

                  </Typography>

                </Grid>
                <Grid item xs={3} sm={3}>
                  <Typography variant="body2" align="center">
                    $
                    {product.price}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2} display="flex" justifyContent="center">
                  <FormControl size="small" color="secondary" fullWidth>
                    <Select
                      value={product.qty}
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        dispatch(addToCart({ productId: product.id, qty: e.target.value }))
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem sx={{ minHeight: 0 }} key={x + 1} value={x + 1}><Typography variant="body2">{x + 1}</Typography></MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} sm={2} display="flex" justifyContent="center">
                  <IconButton color="error" size="small" onClick={() => removeHandler(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>

        <Card variant="outlined" sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h3" mb={1}>
              {cart.length }
              {' '}
              {cart.length > 1 ? 'items' : 'item'}
              {' '}
              in cart
            </Typography>
            <Divider />
            <Typography variant="h5" component="h4" mt={1} style={{ display: 'inline-block' }}>
              Total:
            </Typography>
            <Typography variant="body1" component="span" ml={1}>
              $
              {cart.reduce((a, b) => a + b.price * b.qty, 0)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              disabled={cart.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </CardActions>
        </Card>

      </Grid>
    </Grid>

  )
}

export default CartScreen
