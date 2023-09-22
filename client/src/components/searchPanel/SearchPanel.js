import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

const SearchPanel = () => {
  // Прописать Redux state, когда открывается в меню в мобильной версии, исчезал весь остальной интерфейс
  return (
    <section className="searchPanel">
      <div className="searchPanel__wrapper">
        <div className="searchPanel__title">Добро пожаловать в CRM "StaffPulse"</div>
        <div className="searchPanel__form">
          <InputGroup className="mb-3 searchPanel__input">
            <Form.Control
              placeholder="Найти департамент"
              aria-label="Найти департамент"
              aria-describedby="basic-addon2"
              className="searchPanel__search"
            />
            <Button variant="warning">Поиск </Button>{" "}
            <Form.Select aria-label="Выберите фильтр">
              <option value="1">Выберите фильтр</option>
              <option value="1">От А до Я</option>
              <option value="2">От Я до А</option>
            </Form.Select>
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
