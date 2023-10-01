import { useHttp } from "../../../hooks/http.hook";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { searchData } from "../../dataActions/DataActions";
import Button from "react-bootstrap/Button";
import DataDelete from "./Actions/DataDelete";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchDepartments,
  departmentDeleted,
  toogleActionMenu,
  departmentedUpdated,
} from "./departmentPageSlice";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

const DepartmentData = () => {
  const [departmentName, setDepartmentName] = useState("");

  const dispatch = useDispatch();
  const { request } = useHttp();

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

  const onUpdate = (e, id) => {
    e.preventDefault();

    const newDepartment = {
      name: departmentName,
    };

    request(`https://localhost:3001/api/Department/${id}`, "PUT", JSON.stringify(newDepartment))
      .then((res) => {
        console.log(res, "Успешно отправлено");
        dispatch(departmentedUpdated(newDepartment));
      })
      .then(dispatch(fetchDepartments(request)))
      .catch((err) => console.log(err));

    setDepartmentName("");
    dispatch(toogleActionMenu());
    dispatch(fetchDepartments(request));
  };

  const onDelete = useCallback((id) => {
    request(`https://localhost:3001/api/Department/${id}`, "DELETE")
      .then((data) => console.log(data, "Deleted"))
      .then(dispatch(departmentDeleted(id)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(fetchDepartments(request));
  }, []);

  const filteredData = useSelector(filteredDataSelector);
  const { dataLoadingStatus } = useSelector((state) => state.departmentPage);

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
            <Button onClick={() => onDelete(id)} className="btn-trash btn-sm " variant="danger">
              <FontAwesomeIcon icon="fa-solid fa-trash" />
            </Button>
            <Button onClick={(e) => onUpdate(e, id)} className="btn-edit btn-sm " variant="warning">
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </Button>
            <button></button>
          </td>
        </tr>
      );
    });
  };

  const elements = renderData(filteredData);

  // const Portal = (id) => {
  //   dispatch(toogleActionMenu());
  //   console.log(actionWindow);

  //   const onUpdate = (e, id) => {
  //     e.preventDefault();

  //     const newDepartment = {
  //       name: departmentName,
  //     };

  //     request(`https://localhost:3001/api/Department/${id}`, "PUT", JSON.stringify(newDepartment))
  //       .then((res) => {
  //         console.log(res, "Успешно отправлено");
  //         dispatch(departmentedUpdated(newDepartment));
  //       })
  //       .then(dispatch(fetchDepartments(request)))
  //       .catch((err) => console.log(err));

  //     setDepartmentName("");
  //     dispatch(toogleActionMenu());
  //     dispatch(fetchDepartments(request));
  //   };

  //   console.log(id);

  // };

  switch (dataLoadingStatus) {
    case "loading":
      return <Spinner animation="grow" variant="warning" />;
    case "error":
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    case "idle":
      return (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Количество сотрудников</th>
                <th>Количество менеджеров</th>
              </tr>
            </thead>
            <tbody>{elements}</tbody>
          </Table>
        </>
      );
    default:
      return null;
  }
};

export default DepartmentData;
