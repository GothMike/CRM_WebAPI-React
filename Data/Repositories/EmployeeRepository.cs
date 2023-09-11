using CRM_WebAPI_React.Data.Models;
using CRM_WebAPI_React.Data.Repositories.Interfaces;
using CRM_WebAPI_React.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;

namespace CRM_WebAPI_React.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationContext _context;

        public EmployeeRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesByPosition(int id) => 
            await _context.Employees.Where(e => e.PositionId == id).ToListAsync();

        public async Task<IEnumerable<Employee>> GetAllEmployeesByDepartment(int id) => 
            await _context.Employees.Where(e => e.DepartmentId == id).ToListAsync();

        public async Task<IEnumerable<Employee>> GetAllEmployeesByManagerPosition(bool isAManagerPosition) => 
            await _context.Employees.Where(e => e.Position.IsAManagerPosition == isAManagerPosition).ToListAsync();
    }
}
