import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { searchData } from "../../dataActions/DataActions";

import { fetchDepartments } from "./departmentPageSlice";

import Spinner from "react-bootstrap/Spinner";

import DepartmentTable from "./Items/DepartmentTable";

const DepartmentData = () => {
  const dispatch = useDispatch();

  const filteredDataSelector = createSelector(
    (state) => state.dataFilter.activeFilter,
    (state) => state.departmentPage.data,
    (state) => state.dataSearch.term,
    (filter, data, term) => {
      switch (filter) {
        case "default":
          return searchData(data, term);
        case "asc":
          return searchData([...data], term).sort((a, b) => a.name.localeCompare(b.name));
        case "desc":
          return searchData([...data], term).sort((a, b) => b.name.localeCompare(a.name));
        default:
          return searchData(data, term);
      }
    }
  );

  useEffect(() => {
    dispatch(fetchDepartments(filteredData));
    console.log("effect");

    // eslint-disable-next-line
  }, []);

  const filteredData = useSelector(filteredDataSelector);
  const { dataLoadingStatus } = useSelector((state) => state.departmentPage);

  switch (dataLoadingStatus) {
    case "loading":
      return <Spinner animation="grow" variant="warning" />;
    case "error":
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    case "idle":
      return <DepartmentTable filteredData={filteredData} />;
    default:
      return null;
  }
};

export default DepartmentData;
