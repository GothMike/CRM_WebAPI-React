import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";

import { setSelectedOption } from "./dataFilterSlice";

const DataFilter = () => {
  const sortData = useSelector((state) => state.dataFilter.activeFilter);
  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;

    dispatch(setSelectedOption(selectedOption));
  };

  return (
    <Form.Select value={sortData} onChange={handleSelectChange} aria-label="Выберите фильтр">
      <option value="default">Выберите фильтр</option>
      <option value="asc">От А до Я</option>
      <option value="desc">От Я до А</option>
    </Form.Select>
  );
};

export default DataFilter;
