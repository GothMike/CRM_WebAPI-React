import { useHttp } from "../../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { fetchEmployees } from "./employeePageSlice";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

const EmployeeData = () => {
  const filteredDataSelector = createSelector(
    (state) => state.dataFilter.activeFilter,
    (state) => state.employeePage.data,
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
    dispatch(fetchEmployees(request));

    // eslint-disable-next-line
  }, []);

  const searchData = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  const filteredData = useSelector(filteredDataSelector);
  const { dataLoadingStatus } = useSelector((state) => state.employeePage);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const renderData = (arr) => {
    if (arr.length === 0) {
      return (
        <tr className="table__info">
          <td colSpan={4}>На текущий момент нет информации</td>
        </tr>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <tr key={id}>
          <td className="table__id">{id}</td>
          <td>{props.firstName}</td>
          <td>{props.lastName}</td>
          <td>Неизвестно</td>
        </tr>
      );
    });
  };

  const elements = renderData(filteredData);

  switch (dataLoadingStatus) {
    case "loading":
      return <Spinner animation="grow" variant="warning" />;
    case "error":
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    case "idle":
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя сотрудника</th>
              <th>Фамилия сотрудника</th>
              <th>Позиция сотрудника</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </Table>
      );
    default:
      return null;
  }
};

export default EmployeeData;
