import React from "react"
import products from "../products"
import {useParams} from "react-router-dom"

function ProductScreen() {
  const {id} = useParams()

  const product = products.find(product => product._id === id)
  return (
  <div>{product.name}</div>
  )
}

export default ProductScreen
