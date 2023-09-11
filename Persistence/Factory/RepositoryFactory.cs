using CRM_WebAPI_React.Data.Repositories.Interfaces;
using CRM_WebAPI_React.Data.Repositories;
using CRM_WebAPI_React.Persistence.DataContext;
using CRM_WebAPI_React.Persistence.Fabric.Interfaces;

namespace CRM_WebAPI_React.Persistence.Factory
{
    public class RepositoryFactory : IRepositoryFactory
    {
        private readonly ApplicationContext _context;
        private readonly Dictionary<Type, object> _repositories = new();

        public RepositoryFactory(ApplicationContext context)
        {
            _context = context;
        }

        public IGenericRepository<T> GetRepository<T>() where T : class
        {
            if (!_repositories.TryGetValue(typeof(T), out object repository))
            {
                repository = new GenericRepository<T>(_context);
                _repositories.Add(typeof(T), repository);
            }
            return (IGenericRepository<T>)repository;
        }
    }
}
}
