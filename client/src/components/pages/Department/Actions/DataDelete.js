import { useHttp } from "../../../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchDepartments, departmentDeleted } from "../departmentPageSlice";

const DataDelete = (id) => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onDelete =
    ((id) => {
      request(`https://localhost:3001/api/Department/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(departmentDeleted(id)))
        .catch((err) => console.log(err));
    },
    []);

  useEffect(() => {
    dispatch(fetchDepartments(request));
  });

  return (
    <Button onClick={() => onDelete(id)} className="btn-trash btn-sm " variant="danger">
      <FontAwesomeIcon icon="fa-solid fa-trash" />
    </Button>
  );
};

export default DataDelete;
