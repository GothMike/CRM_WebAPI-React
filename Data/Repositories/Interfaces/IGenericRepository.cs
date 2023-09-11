namespace CRM_WebAPI_React.Data.Repositories.Interfaces
{
    /// <summary>
    /// Интерфейс, который определяет базовые методы для работы с репозиторием.
    /// </summary>
    /// <typeparam name="TEntity">Тип сущности.</typeparam>
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Асинхронно добавляет сущность в репозиторий.
        /// </summary>
        /// <param name="entity">Сущность для добавления.</param>
        Task AddAsync(TEntity entity);

        /// <summary>
        /// Асинхронно получает сущность из репозитория по ее идентификатору.
        /// </summary>
        /// <param name="id">Идентификатор сущности.</param>
        /// <returns>Сущность, найденная по идентификатору.</returns>
        Task<TEntity> GetByIdAsync(int id);

        /// <summary>
        /// Асинхронно получает все сущности из репозитория.
        /// </summary>
        /// <returns>Коллекция сущностей.</returns>
        Task<IEnumerable<TEntity>> GetAllAsync();

        /// <summary>
        /// Обновляет сущность в репозитории.
        /// </summary>
        /// <param name="entity">Сущность для обновления.</param>
        void Update(TEntity entity);

        /// <summary>
        /// Удаляет сущность из репозитория.
        /// </summary>
        /// <param name="entity">Сущность для удаления.</param>
        void Delete(TEntity entity);

        /// <summary>
        /// Удаляет все сущности из репозитория.
        /// </summary>
        /// <param name="entities">Коллекция сущностей для удаления.</param>
        void DeleteAllEntites(IQueryable<TEntity> entities);
    }
}
