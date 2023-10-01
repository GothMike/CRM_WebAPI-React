import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { createPortal } from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toogleActionMenu, createDepartment } from "../departmentPageSlice";

const DataCreate = () => {
  const dispatch = useDispatch();
  const actionWindow = useSelector((state) => state.departmentPage.actionWindow);
  const [departmentName, setDepartmentName] = useState("");

  const onCreate = (e) => {
    e.preventDefault();
    const newDepartment = {
      name: departmentName,
    };
    dispatch(createDepartment(newDepartment));

    setDepartmentName("");
    dispatch(toogleActionMenu());
  };

  return (
    <>
      <Button
        onClick={() => dispatch(toogleActionMenu())}
        variant="warning"
        className="table__create"
      >
        <FontAwesomeIcon icon="fa-solid fa-user-plus" />
      </Button>

      {createPortal(
        <form
          onSubmit={onCreate}
          className={`border p-4 shadow-lg rounded form ${actionWindow ? "form_active" : ""}`}
        >
          <CloseButton onClick={() => dispatch(toogleActionMenu())} />
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
              Название департамента
            </label>
            <input
              required
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Введите название департамента"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Создать
          </button>
        </form>,
        document.body
      )}
    </>
  );
};

export default DataCreate;
