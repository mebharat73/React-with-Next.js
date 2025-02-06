import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth/authSlice.js";
import cartReducer from "@/redux/cart/cartSlice.js";
import userPreferencesReducer from "@/redux/userPreferences/userPreferencesSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  userPreferences: userPreferencesReducer,
});

export default rootReducer;
