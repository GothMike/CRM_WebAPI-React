namespace CRM_WebAPI_React.Data.Services.Interfaces
{
    /// <summary>
    /// Интерфейс, который определяет методы для базовой работы с сервисом.
    /// </summary>
    /// <typeparam name="TEntity">Сущность, с которой работает сервис.</typeparam>
    /// <typeparam name="TEntityDto">DTO объект для сущности.</typeparam>
    public interface IBaseService<TEntity, TEntityDto> : IMapperService<TEntity, TEntityDto>
    {
        /// <summary>
        /// Асинхронно получает сущность по ее идентификатору.
        /// </summary>
        /// <param name="id">Идентификатор сущности.</param>
        /// <returns>Сущность с указанным идентификатором.</returns>
        Task<TEntity> GetEntityByIdAsync(int id);

        /// <summary>
        /// Обновляет данные сущности в базе данных.
        /// </summary>
        /// <param name="entityDto">DTO сущности с новыми данными.</param>
        /// <param name="entity">Сущность с текущими данными в базе данных.</param>
        /// <returns>Асинхронная задача.</returns>
        Task Update(TEntityDto entityDto, TEntity entity);
            
        /// <summary>
        /// Асинхронно удаляет указанную сущность из репозитория.
        /// </summary>
        /// <param name="entity">Сущность, которую необходимо удалить.</param>
        /// <returns>Асинхронная операция.</returns>
        Task DeleteAsync(TEntity entity);
    }
}
