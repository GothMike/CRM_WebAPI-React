import InputGroup from "react-bootstrap/InputGroup";

import DataSearch from "../dataSearch/DataSearch";
import DataFilter from "../dataFilter/DataFilter";
import { useSelector } from "react-redux";

const SearchPanel = () => {
  const hiddenSidebar = useSelector((state) => state.searchPanel);

  return (
    <section className={`searchPanel ${!hiddenSidebar ? "searchPanel_hidden" : ""} `}>
      <div className="searchPanel__wrapper">
        <h1 className="searchPanel__title">Добро пожаловать в CRM "StaffPulse"</h1>
        <div className="searchPanel__form">
          <InputGroup className="mb-3 searchPanel__input">
            <DataSearch />
            <DataFilter />
          </InputGroup>
        </div>
      </div>
    </section>
  );
};

export default SearchPanel;
