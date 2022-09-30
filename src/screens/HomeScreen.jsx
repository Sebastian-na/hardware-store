import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography, Grid, Alert, AlertTitle,
} from '@mui/material'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { fetchProducts } from '../reducers/productReducer'

function HomeScreen() {
  const dispatch = useDispatch()
  const productsState = useSelector((state) => state.productList)
  const { products, loading, error } = productsState

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <Grid container justify="center" alignItems="center" mt={5}>
        <Grid item xs={12}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Grid>
      </Grid>
    )
  }

  return (
    <main style={{ marginTop: '120px' }}>
      <Typography variant="h1" component="h2" sx={{ textTransform: 'uppercase' }}>
        Latest Products
      </Typography>
      <Grid container spacing={2} mt={2} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default HomeScreen
