import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './reducers/productReducers'
import productDetailReducer from './reducers/productDetailReducer'

const rootReducer = {
  productList: productListReducer,
  productDetail: productDetailReducer,
}
const store = configureStore({
  reducer: rootReducer,
})

export default store
