import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  CardActionArea,
} from '@mui/material'
import { Link } from 'react-router-dom'
import Image from 'material-ui-image'

function Product({ product }) {
  return (
    <CardActionArea>
      <Card variant="outlined" sx={{ padding: 3, margin: 'auto' }}>
        <Link to={`/product/${product._id}`}>
          <CardMedia>
            <Image src={product.image} alt={product.name} />
          </CardMedia>
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            sx={{ textTransform: 'uppercase' }}
          >
            {product.name}
          </Typography>

          <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="read-only"
              value={parseFloat(product.rating)}
              readOnly
            />
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              ml={1}
            >
              {product.numReviews}
              {' '}
              reviews
            </Typography>
          </Box>

          <Typography variant="h4" component="p" mt={2}>
            $
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default Product
