import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth/authSlice.js";
import cartReducer from "@/redux/cart/cartSlice.js";
import userPreferencesReducer from "@/redux/userPreferences/userPreferencesSlice.js";
import productReducer from './sattapatta/productSlice'; // import the products slice
import exchangeCartReducer from './sattapatta/exchangeCartSlice.js'

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  userPreferences: userPreferencesReducer,
  products: productReducer, // this is where the products slice is added
  exchangeCart: exchangeCartReducer, // Your exchangeCart slice
});

export default rootReducer;
