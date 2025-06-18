import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // List of products added to cart
  exchangeOrders: [], // List of exchange orders
};

const exchangeCartSlice = createSlice({
  name: 'exchangeCart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); // Add product to cart
    },
    confirmExchange: (state, action) => {
      // Ensure cartItems is an array before calling find
      if (Array.isArray(state.exchangeOrders)) {
        const order = state.exchangeOrders.find(order => order.id === action.payload.id);
        if (order) {
          order.status = 'confirmed'; // Mark exchange as confirmed
        }
      }
    },
    declineExchange: (state, action) => {
      // Ensure exchangeOrders is an array before calling find
      if (Array.isArray(state.exchangeOrders)) {
        const order = state.exchangeOrders.find(order => order.id === action.payload.id);
        if (order) {
          order.status = 'declined'; // Mark exchange as declined
        }
      }
    },
    createOrder: (state, action) => {
      // Ensure exchangeOrders is an array before calling push
      if (!Array.isArray(state.exchangeOrders)) {
        state.exchangeOrders = [];
      }
      state.exchangeOrders.push(action.payload); // Create new exchange order
    },
    updateProductStatus: (state, action) => {
      // Ensure cartItems is an array before calling find
      if (Array.isArray(state.cartItems)) {
        const product = state.cartItems.find(product => product.id === action.payload.productId);
        if (product) {
          product.status = action.payload.newStatus; // Update product status
        }
      }
    }
  },
});

export const { addToCart, confirmExchange, declineExchange, createOrder, updateProductStatus } = exchangeCartSlice.actions;
export default exchangeCartSlice.reducer;
