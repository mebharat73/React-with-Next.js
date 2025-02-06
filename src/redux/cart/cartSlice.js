const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.products.find(
        (item) => item.id == product.id
      );

      if (existingProduct) {
        state.products = state.products.map((item) => {
          if (item.id == product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        });
      } else {
        state.products = [...state.products, { ...product, quantity: 1 }];
      }

      state.totalPrice = state.products.reduce((total, item) => {
        total = item.price + state.totalPrice;

        return total;
      }, 0);
    },
    increaseQuantity: (state, action) => {
      const product = action.payload;

      state.products = state.products.map((item) => {
        if (item.id == product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      state.totalPrice = state.totalPrice + product.price;
    },
    decreaseQuantity: (state, action) => {
      const product = action.payload;

      if (product.quantity <= 1) return;

      state.products = state.products.map((item) => {
        if (item.id == product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });

      state.totalPrice = state.totalPrice - product.price;
    },
    removeFromCart: (state, action) => {
      const product = action.payload;

      state.products = state.products.filter((item) => item.id != product.id);

      state.totalPrice = state.totalPrice - product.price * product.quantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
