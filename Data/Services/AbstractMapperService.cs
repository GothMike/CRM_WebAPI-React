using AutoMapper;
using CRM_WebAPI_React.Data.Services.Interfaces;
using CRM_WebAPI_React.Persistence.UnitOfWork;

namespace CRM_WebAPI_React.Data.Services
{
    public abstract class AbstractMapperService<TEntity, TEntityDto> : IMapperService<TEntity, TEntityDto>
         where TEntity : class
         where TEntityDto : class
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IMapper _mapper;

        public AbstractMapperService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TEntityDto>> GetAllAsync()
        {
            return _mapper.Map<IEnumerable<TEntityDto>>(await _unitOfWork.CreateRepository<TEntity>().GetAllAsync());
        }
        public async Task<TEntityDto> GetMapEntityByIdAsync(int id)
        {
            return _mapper.Map<TEntityDto>(await _unitOfWork.CreateRepository<TEntity>().GetByIdAsync(id));
        }

        public TEntity ConvertToMapEntity(TEntityDto entityDto)
        {
            return _mapper.Map<TEntity>(entityDto);
        }


    }
}
