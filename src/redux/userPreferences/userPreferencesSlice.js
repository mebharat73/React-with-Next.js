import { PRODUCT_GRID_VIEW, PRODUCT_LIST_VIEW } from "@/constants/productView";

const { LIGHT_MODE, DARK_MODE } = require("@/constants/theme");
const { createSlice } = require("@reduxjs/toolkit");

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState: {
    theme: LIGHT_MODE,
    productView: PRODUCT_GRID_VIEW,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
    },
    toggleProductView: (state) => {
      state.productView =
        state.productView === PRODUCT_GRID_VIEW
          ? PRODUCT_LIST_VIEW
          : PRODUCT_GRID_VIEW;
    },
  },
});

export const { toggleTheme, toggleProductView } = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
