using CRM_WebAPI_React.Data.Repositories.Interfaces;

namespace CRM_WebAPI_React.Persistence.UnitOfWork
{
    /// <summary>
    /// Интерфейс для работы с базой данных, который определяет методы для создания репозиториев и доступа к репозиториям для работы с определенными типами сущностей.
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Создает репозиторий для указанного типа сущности.
        /// </summary>
        /// <typeparam name="TEntity">Тип сущности, для которой нужен репозиторий.</typeparam>
        /// <returns>Репозиторий для указанного типа сущности.</returns>
        public IGenericRepository<TEntity> CreateRepository<TEntity>() where TEntity : class;

        /// <summary>
        /// Репозиторий для работы с сотрудниками.
        /// </summary>
        public IEmployeeRepository EmployeeRepository { get; }

        /// <summary>
        /// Асинхронно сохраняет все изменения, сделанные в базе данных.
        /// </summary>
        /// <returns>Асинхронная операция.</returns>
        public Task SaveAsync();
    }
}
