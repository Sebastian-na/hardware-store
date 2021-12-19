import React from "react"
import products from "../products"
import { useParams } from "react-router-dom"
import { Box, Button, Grid, Typography, Rating, Card, CardHeader, CardContent } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import Image from "material-ui-image"

function ProductScreen() {
  const { id } = useParams()

  const product = products.find(product => product._id === id)
  return (
    <main style={{marginTop: '50px'}}>
      <Button color="primary" startIcon={<ArrowBack />}>
        Go Back
      </Button>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Image src={product.image} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Card >
            <CardContent>
              <Typography variant="h4" component="h1" textAlign="center">{product.name}</Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Rating name="read-only" value={product.rating} readOnly />
                <Typography variant="body1" component="p" ml={2}>
                  {product.numReviews} reviews
                </Typography>
              </Box>
              <Typography variant="body1" component="p"  mt={4}>
                {product.description}
              </Typography>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </main>
  )
}

export default ProductScreen
