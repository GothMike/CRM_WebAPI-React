import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { useEffect, useCallback, useState } from "react";

import {
  fetchDepartments,
  departmentCreated,
  departmentDeleted,
} from "../pages/Department/departmentPageSlice";

export const searchData = (items, term) => {
  if (term.length === 0) {
    return items;
  }
  return items.filter((item) => {
    return item.name.indexOf(term) > -1;
  });
};

const DataActions = () => {};

export default DataActions;
