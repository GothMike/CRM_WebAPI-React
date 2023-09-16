using CRM_WebAPI_React.Data.Repositories.Interfaces;
using CRM_WebAPI_React.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;

namespace CRM_WebAPI_React.Data.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly ApplicationContext _context;
        private readonly DbSet<TEntity>? _dbSet = null;
        public GenericRepository(ApplicationContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public async Task AddAsync(TEntity entity) => await _dbSet.AddAsync(entity);

        public async Task<IEnumerable<TEntity>> GetAllAsync() => await _dbSet.ToListAsync();

        public async Task<TEntity> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

        public void Delete(TEntity entity) => _dbSet.Remove(entity);

        public void DeleteAllEntites(IQueryable<TEntity> entities) => _dbSet.RemoveRange(entities);

        public void Update(TEntity entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
