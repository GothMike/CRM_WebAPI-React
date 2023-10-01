import DataDelete from "../Actions/DataDelete";
import DataUpdate from "../Actions/DataUpdate";

const DepartmentItem = ({ id, name }) => {
  return (
    <tr key={id}>
      <td className="table__id">{id}</td>
      <td>{name}</td>
      <td>0</td>
      <td>0</td>
      <td>
        <DataDelete id={id} />
        <DataUpdate id={id} />
      </td>
    </tr>
  );
};

export default DepartmentItem;
