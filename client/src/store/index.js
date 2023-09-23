import { configureStore } from "@reduxjs/toolkit";
import searchPanelSlice from "../components/searchPanel/searchPanelSlice";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    searchPanel: searchPanelSlice,
  },
  mmiddleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
