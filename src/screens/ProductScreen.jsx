import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Grid,
  Typography,
  Rating,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import Image from 'material-ui-image'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { fetchProductDetail } from '../reducers/productDetailReducer'

function ProductScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productState = useSelector((state) => state.productDetail)
  const { product, loading, error } = productState

  useEffect(async () => {
    dispatch(fetchProductDetail(id))
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
    <main style={{ marginTop: '50px' }}>
      <Button
        color="primary"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
      <Grid container mt={7} spacing={5}>
        <Grid item xs={12} sm={9} md={5} lg={5} xl={5} sx={{ mx: 'auto' }}>
          <Card variant="outlined">
            <CardMedia>
              <Image src={product.image} alt={product.name} />
            </CardMedia>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={4} lg={4} xl={4} sx={{ mx: 'auto' }}>
          <Typography
            variant="h4"
            component="h1"
            mb={3}
            sx={{ textTransform: 'uppercase' }}
          >
            {product.name}
          </Typography>
          <Divider />
          <Box
            sx={{
              mt: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="read-only"
              value={parseFloat(product.rating)}
              readOnly
            />
            <Typography variant="body1" component="p" ml={2}>
              {product.numReviews}
              {' '}
              reviews
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            <Typography variant="body1" component="p">
              Price: $
              {product.price}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="body1" component="p" mt={4}>
            {product.description}
          </Typography>
        </Grid>
        <Grid item xl={3} xs={12} sm={8} md={3} lg={3} sx={{ mx: 'auto' }}>
          <Card variant="outlined">
            <CardContent>
              <Grid container justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1" component="h3">
                  Price:
                </Typography>
                <Typography variant="body1" component="p">
                  $
                  {product.price}
                </Typography>
              </Grid>
              <Divider />
              <Grid container justifyContent="space-between" mt={1} mb={1}>
                <Typography variant="subtitle1" component="h4">
                  Status:
                </Typography>
                <Typography variant="body1" component="p">
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
              </Grid>
              <Divider />
            </CardContent>
            <CardActions>
              <Box pt={1} pb={1} sx={{ width: '100%' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mx: 'auto', height: '100%' }}
                  fullWidth
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </main>
  )
}

export default ProductScreen
