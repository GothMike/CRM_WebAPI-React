import { useHttp } from "../../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { fetchDepartments, departmentDeleted } from "./departmentPageSlice";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

const DepartmentData = () => {
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

  const onDelete = useCallback((id) => {
    request(`https://localhost:3001/api/Department/${id}`, "DELETE")
      .then((data) => console.log(data, "Deleted"))
      .then(dispatch(departmentDeleted(id)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(fetchDepartments(request));

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
  const { dataLoadingStatus } = useSelector((state) => state.departmentPage);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const renderData = (arr) => {
    if (arr.length === 0) {
      return (
        <tr className="table__info">
          <td colSpan={5}>На текущий момент нет информации</td>
        </tr>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <tr key={id}>
          <td className="table__id">{id}</td>
          <td>{props.name}</td>
          <td>0</td>
          <td>0</td>
          <td>
            <button onClick={() => onDelete(id)} type="button" className="btn-trash btn-sm ">
              <i className="fas fa-trash"></i>
            </button>
            <button>
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </td>
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
              <th>Название</th>
              <th>Количество сотрудников</th>
              <th>Количество менеджеров</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </Table>
      );
    default:
      return null;
  }
};

export default DepartmentData;
