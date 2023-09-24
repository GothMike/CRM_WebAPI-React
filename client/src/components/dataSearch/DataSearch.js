import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { searchEnteredData } from "./dataSearchSlice";

const DataSearch = () => {
  const enteredData = useSelector((state) => state.dataSearch.term);
  const dispatch = useDispatch();

  const onUpdateSearch = (e) => {
    const term = e.target.value;
    dispatch(searchEnteredData(term));
  };

  return (
    <>
      <Form.Control
        value={enteredData}
        onChange={onUpdateSearch}
        placeholder="Найти департамент"
        aria-label="Найти департамент"
        aria-describedby="basic-addon2"
        className="searchPanel__search"
      />
    </>
  );
};

export default DataSearch;
