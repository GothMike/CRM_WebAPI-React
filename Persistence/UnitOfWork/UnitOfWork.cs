using CRM_WebAPI_React.Data.Repositories;
using CRM_WebAPI_React.Data.Repositories.Interfaces;
using CRM_WebAPI_React.Persistence.DataContext;
using CRM_WebAPI_React.Persistence.Fabric.Interfaces;

namespace CRM_WebAPI_React.Persistence.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext _context;
        private readonly IRepositoryFactory _repositoryFactory;

        private IEmployeeRepository _employeeRepository;

        public UnitOfWork(ApplicationContext context, IRepositoryFactory repositoryFactory)
        {
            _context = context;
            _repositoryFactory = repositoryFactory;
        }

        public IGenericRepository<TEntity> CreateRepository<TEntity>() where TEntity : class
        {
            return _repositoryFactory.GetRepository<TEntity>();
        }

        public IEmployeeRepository EmployeeRepository
        {
            get
            {
                if (_employeeRepository == null)
                {
                    _employeeRepository = new EmployeeRepository(_context);
                }
                return _employeeRepository;
            }
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }
    }
}
