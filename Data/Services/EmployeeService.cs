using AutoMapper;
using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;
using CRM_WebAPI_React.Data.Services.Interfaces;
using CRM_WebAPI_React.Persistence.UnitOfWork;

namespace CRM_WebAPI_React.Data.Services
{
    public class EmployeeService : AbstractMapperService<Employee, EmployeeDto>, IEmployeeService
    {
        public EmployeeService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public async Task<bool> CheckDepentEntities(int positionId, int departmentId)
        {
            var position = await _unitOfWork.CreateRepository<Position>().GetByIdAsync(positionId);
            var department = await _unitOfWork.CreateRepository<Department>().GetByIdAsync(departmentId);

            if (position == null)
                return false;

            if(department == null)
                return false;

            return true;
        }

        public async Task CreateEmployeeAsync(EmployeeDto employeeDto, int positionId, int departmentId)
        {
            // Поиск зависимых сущностей по ID
            var position = await _unitOfWork.CreateRepository<Position>().GetByIdAsync(positionId);
            var department = await _unitOfWork.CreateRepository<Department>().GetByIdAsync(departmentId);

            // Конвертация в базовый класс
            var employee = ConvertToMapEntity(employeeDto);
 
            employee.Department = department;
            employee.Position = position;

            await _unitOfWork.CreateRepository<Employee>().AddAsync(employee);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteAsync(Employee entity)
        {
            _unitOfWork.CreateRepository<Employee>().Delete(entity);
            await _unitOfWork.SaveAsync();
        }

        public async Task<Employee> GetEntityByIdAsync(int id)
        {
            return await _unitOfWork.CreateRepository<Employee>().GetByIdAsync(id);
        }

        public async Task Update(EmployeeDto entityDto, Employee entity)
        {
            entity.FirstName = entityDto.FirstName;
            entity.LastName = entityDto.LastName;

            _unitOfWork.CreateRepository<Employee>().Update(entity);
            await _unitOfWork.SaveAsync();
        }
    }
}
