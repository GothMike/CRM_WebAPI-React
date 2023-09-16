using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;

namespace CRM_WebAPI_React.Data.Services.Interfaces
{
    public interface IPositionService : IBaseService<Position, PositionDto>, IMapperService<Position, PositionDto>
    {
        Task CreatePositionAsync(PositionDto positionDto);
    }
}
