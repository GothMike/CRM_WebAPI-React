using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;

namespace CRM_WebAPI_React.Data.Services.Interfaces
{
    public interface IDepartmentService : IBaseService<Department, DepartmentDto>, IMapperService<Department, DepartmentDto>
    {
        Task CreateDepartmentAsync(DepartmentDto departmentDto);
    }
}
