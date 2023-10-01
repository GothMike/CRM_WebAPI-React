import { configureStore } from "@reduxjs/toolkit";

import searchPanelSlice from "../components/searchPanel/searchPanelSlice";
import dataFilterSlice from "../components/dataFilter/dataFilterSlice";
import dataSearchSlice from "../components/dataSearch/dataSearchSlice";

import departmentPageSlise from "../components/pages/Department/departmentPageSlice";
import positionPageSlice from "../components/pages/Position/positionPageSlice";
import employeePageSlice from "../components/pages/Employee/employeePageSlice";

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
    dataFilter: dataFilterSlice,
    dataSearch: dataSearchSlice,
    departmentPage: departmentPageSlise,
    positionPage: positionPageSlice,
    employeePage: employeePageSlice,
  },
  mmiddleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
