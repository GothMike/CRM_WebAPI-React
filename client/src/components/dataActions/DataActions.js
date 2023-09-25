import { useHttp } from "../../hooks/http.hook";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchDepartments } from "../pages/Department/departmentPageSlice";

import { departmentCreated } from "../pages/Department/departmentPageSlice";

const DataActions = () => {
  const [departmentName, setDepartmentName] = useState("");

  const [actionWindowIsOpened, setActionWindowIsOpened] = useState(false);

  const onSubmitOpened = () => {
    setActionWindowIsOpened(!actionWindowIsOpened);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newDepartment = {
      name: departmentName,
    };

    request("https://localhost:3001/api/Department", "POST", JSON.stringify(newDepartment))
      .then((res) => console.log(res, "Отправка успешна"))
      .then(dispatch(departmentCreated(newDepartment)))
      .catch((err) => console.log(err));

    setDepartmentName("");
    setActionWindowIsOpened(!actionWindowIsOpened);
    dispatch(fetchDepartments(request));
  };

  const dispatch = useDispatch();
  const { request } = useHttp();

  return (
    <>
      <Button onClick={onSubmitOpened} variant="warning">
        Добавить
        <FontAwesomeIcon icon="fa-solid fa-user-plus" />
      </Button>{" "}
      {createPortal(
        <form
          className={`border p-4 shadow-lg rounded form ${
            actionWindowIsOpened ? "form_active" : ""
          }`}
          onSubmit={onSubmitHandler}
        >
          <CloseButton onClick={onSubmitOpened} />
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

export default DataActions;
