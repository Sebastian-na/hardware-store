import React from "react"
import Product from "../components/Product"
import products from "../products"
import { Typography, Grid } from "@mui/material"

function HomeScreen() {
  return (
    <main style={{marginTop: '50px'}}>
      <Typography variant="h3" component="h1">Latest Products</Typography>
      <Grid container spacing={2} mt={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default HomeScreen
