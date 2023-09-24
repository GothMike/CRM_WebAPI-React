import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

import DataSearch from "../dataSearch/DataSearch";
import DataFilter from "../dataFilter/DataFilter";
import { useSelector } from "react-redux";

const SearchPanel = () => {
  const hiddenSidebar = useSelector((state) => state.searchPanel);

  return (
    <section className={`searchPanel ${!hiddenSidebar ? "searchPanel_hidden" : ""} `}>
      <div className="searchPanel__wrapper">
        <div className="searchPanel__title">Добро пожаловать в CRM "StaffPulse"</div>
        <div className="searchPanel__form">
          <InputGroup className="mb-3 searchPanel__input">
            <DataSearch />
            <DataFilter />
          </InputGroup>
        </div>
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
      </div>
    </section>
  );
};

export default SearchPanel;
