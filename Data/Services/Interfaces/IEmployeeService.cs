using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;

namespace CRM_WebAPI_React.Data.Services.Interfaces
{
    public interface IEmployeeService : IBaseService<Employee, EmployeeDto>, IMapperService<Employee, EmployeeDto>
    {
        Task CreateEmployeeAsync(EmployeeDto employeeDto, int positionId, int departmentId);
        Task<bool> CheckDepentEntities(int positionId, int departmentId);
    }
}
