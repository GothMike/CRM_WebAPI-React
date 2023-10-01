import DataCreate from "../Actions/DataCreate";

import { renderDepartmentList } from "../Items/DepartmentList";

import Table from "react-bootstrap/Table";

const DepartmentTable = ({ filteredData }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Количество сотрудников</th>
            <th>Количество менеджеров</th>
            <th>
              <DataCreate />
            </th>
          </tr>
        </thead>
        <tbody>{renderDepartmentList(filteredData)}</tbody>
      </Table>
    </>
  );
};

export default DepartmentTable;
