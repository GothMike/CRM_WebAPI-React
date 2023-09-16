using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;
using CRM_WebAPI_React.Data.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM_WebAPI_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;


        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<EmployeeDto>))]
        public async Task<IActionResult> GetEmployeesAsync()
        {
            return Ok(await _employeeService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(EmployeeDto))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetEmployeeAsync(int id)
        {
            var entity = await _employeeService.GetMapEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            return Ok(entity);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateEmployeeAsync([FromBody] EmployeeDto entityDto, int positionId, int departmentId)
        {
            if (entityDto == null)
                return BadRequest(ModelState);

            if (!await _employeeService.CheckDepentEntities(positionId, departmentId))
                return NotFound();

            await _employeeService.CreateEmployeeAsync(entityDto, positionId, departmentId);

            return Ok($"Сотрудник {entityDto.FirstName + " " + entityDto.LastName} успешно создан!");
        }

        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateEmployeeAsync(int id, [FromBody] EmployeeDto entityDto)
        {
            if (entityDto == null)
                return BadRequest();

            if (id != entityDto.Id)
                return BadRequest();

            var entity = await _employeeService.GetEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _employeeService.Update(entityDto, entity);

            return Ok($"Сотрудник {entityDto.FirstName + " " + entityDto.LastName} успешно отредактирован");
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteEmployeeAsync(int id)
        {
            var entity = await _employeeService.GetEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _employeeService.DeleteAsync(entity);

            return Ok($"Сотрудник {entity.FirstName + " " + entity.LastName} успешно удален");
        }
    }
}
