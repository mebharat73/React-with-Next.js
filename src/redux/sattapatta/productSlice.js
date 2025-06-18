import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Thunk action to fetch products
export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const productData = await getAllProducts(); // Assuming this function fetches the products
    dispatch(setProducts(productData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const { setProducts, setLoading, setError } = productsSlice.actions;

export default productsSlice.reducer;
