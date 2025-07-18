import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import persistReducer from "redux-persist/es/persistReducer";
import rootReducer from "./rootReducer";
import persistStore from "redux-persist/es/persistStore";
import { PERSIST } from "redux-persist";


const persistConfig = {
  key: "aria",
  storage,
  whitelist: ["auth", "userPreferences", "cart", "exchangeCart", "products"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST],
      },
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
