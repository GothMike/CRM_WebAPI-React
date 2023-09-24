import Dropdown from "react-bootstrap/Dropdown";

const DataActions = () => {
  return (
    <Dropdown className="searchPanel__action">
      <Dropdown.Toggle variant="warning" id="dropdown-basic">
        Действие
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Добавить</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Изменить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DataActions;
