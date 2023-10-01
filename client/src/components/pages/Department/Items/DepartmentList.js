import DepartmentItem from "./DepartmentItem";

export const renderDepartmentList = (arr) => {
  if (arr.length === 0) {
    return (
      <tr className="table__info">
        <td colSpan={5}>На текущий момент нет информации</td>
      </tr>
    );
  }

  return arr.map(({ ...props }) => {
    return <DepartmentItem {...props} />;
  });
};
