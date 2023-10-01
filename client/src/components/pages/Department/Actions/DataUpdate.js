import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { createPortal } from "react-dom";

import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateDepartment } from "../departmentPageSlice";

const DataUpdate = ({ id }) => {
  const [portalVisible, setPortalVisible] = useState(false);

  const idUpdateDepartment = id;
  const dispatch = useDispatch();
  const [departmentName, setDepartmentName] = useState("");

  const onUpdate = (e, id) => {
    e.preventDefault();

    const newDepartment = {
      id: id,
      name: departmentName,
    };

    dispatch(updateDepartment({ id, newDepartment }));

    setDepartmentName("");
    setPortalVisible(!portalVisible);
  };

  const renderPortal = () => {
    if (portalVisible) {
      return (
        <>
          {createPortal(
            <form
              onSubmit={(e) => onUpdate(e, idUpdateDepartment)}
              className={`border p-4 shadow-lg rounded form form_active`}
            >
              <CloseButton onClick={() => setPortalVisible(!portalVisible)} />
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
    } else {
      return null;
    }
  };

  return (
    <>
      <Button
        onClick={() => setPortalVisible(!portalVisible)}
        className="btn-edit btn-sm "
        variant="warning"
      >
        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
      </Button>
      {renderPortal()}
    </>
  );
};

export default DataUpdate;
