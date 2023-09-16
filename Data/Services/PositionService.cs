using AutoMapper;
using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;
using CRM_WebAPI_React.Data.Services.Interfaces;
using CRM_WebAPI_React.Persistence.UnitOfWork;

namespace CRM_WebAPI_React.Data.Services
{
    public class PositionService : AbstractMapperService<Position, PositionDto>, IPositionService
    {
        public PositionService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public async Task CreatePositionAsync(PositionDto entityDto)
        {
            await _unitOfWork.CreateRepository<Position>().AddAsync(ConvertToMapEntity(entityDto));
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteAsync(Position entity)
        {
            _unitOfWork.CreateRepository<Position>().Delete(entity);
            await _unitOfWork.SaveAsync();
        }

        public async Task<Position> GetEntityByIdAsync(int id)
        {
            return await _unitOfWork.CreateRepository<Position>().GetByIdAsync(id);
        }

        public async Task Update(PositionDto entityDto, Position entity)
        {
            entity.Name = entityDto.Name;

            _unitOfWork.CreateRepository<Position>().Update(entity);
            await _unitOfWork.SaveAsync();
        }
    }
}
