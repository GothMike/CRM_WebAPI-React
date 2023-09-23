import { configureStore } from "@reduxjs/toolkit";
import searchPanelSlice from "../components/searchPanel/searchPanelSlice";
import dataListSlice from "../components/dataList/dataListSlice";
import dataFilterSlice from "../components/dataFilter/dataFilterSlice";

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
    dataList: dataListSlice,
    dataFilter: dataFilterSlice,
  },
  mmiddleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
