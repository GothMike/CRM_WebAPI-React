namespace CRM_WebAPI_React.Data.Services.Interfaces
{
    /// <summary>
    /// Интерфейс, который работает с DTO объектами
    /// </summary>
    /// <typeparam name="TEntity">Сущность, с которой работает сервис.</typeparam>
    /// <typeparam name="TEntityDto">DTO объект для сущности.</typeparam>
    public interface IMapperService<TEntity, TEntityDto>
    {
        /// <summary>
        /// Асинхронно получает все сущности.
        /// </summary>
        /// <returns>Коллекция сущностей.</returns>
        Task<IEnumerable<TEntityDto>> GetAllAsync();

        /// <summary>
        /// Асинхронно получает DTO объект сущности по ее идентификатору.
        /// </summary>
        /// <param name="id">Идентификатор сущности.</param>
        /// <returns>DTO объект сущности с указанным идентификатором.</returns>
        Task<TEntityDto> GetMapEntityByIdAsync(int id);

        /// <summary>
        /// Конвертирует DTO объект сущности в сущность.
        /// </summary>
        /// <param name="entityDto">DTO объект сущности.</param>
        /// <returns>Сущность, полученная на основе DTO объекта.</returns>
        TEntity ConvertToMapEntity(TEntityDto entityDto);
    }
}
