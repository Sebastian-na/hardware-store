import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './reducers/productReducer'
import productDetailReducer from './reducers/productDetailReducer'
import cartReducer from './reducers/cartReducer'
import userLoginReducer from './reducers/userLoginReducer'
import userRegisterReducer from './reducers/userRegisterReducer'

const rootReducer = {
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
}
const store = configureStore({
  reducer: rootReducer,
})

export default store
