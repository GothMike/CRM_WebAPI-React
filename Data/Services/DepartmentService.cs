using AutoMapper;
using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;
using CRM_WebAPI_React.Data.Services.Interfaces;
using CRM_WebAPI_React.Persistence.UnitOfWork;

namespace CRM_WebAPI_React.Data.Services
{
    public class DepartmentService : AbstractMapperService<Department, DepartmentDto>, IDepartmentService
    {
        public DepartmentService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public async Task CreateDepartmentAsync(DepartmentDto entityDto)
        {
            await _unitOfWork.CreateRepository<Department>().AddAsync(ConvertToMapEntity(entityDto));
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteAsync(Department entity)
        {
            _unitOfWork.CreateRepository<Department>().Delete(entity);
            await _unitOfWork.SaveAsync();
        }

        public async Task<Department> GetEntityByIdAsync(int id)
        {
            return await _unitOfWork.CreateRepository<Department>().GetByIdAsync(id);
        }

        public async Task Update(DepartmentDto entityDto, Department entity)
        {
            entity.Name = entityDto.Name;

            _unitOfWork.CreateRepository<Department>().Update(entity);
            await _unitOfWork.SaveAsync();
        }
    }
}
