using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRM_WebAPI_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;


        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<DepartmentDto>))]
        public async Task<IActionResult> GetDepartmentsAsync()
        {
            return Ok(await _departmentService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(DepartmentDto))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetDepartmentAsync(int id)
        {
            var entity = await _departmentService.GetMapEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            var responseObj = new { Message = $"{entity}" };


            return Ok(entity);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateDepartmentAsync([FromBody] DepartmentDto entityDto)
        {
            if (entityDto == null)
                return BadRequest(ModelState);

            await _departmentService.CreateDepartmentAsync(entityDto);

            var responseObj = new { Message = $"Департамент {entityDto.Name} успешно создан!" };

            return Ok(responseObj);
        }


        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateDepartmentAsync(int id, [FromBody] DepartmentDto entityDto)
        {
            if (entityDto == null)
                return BadRequest();

            if (id != entityDto.Id)
                return BadRequest();

            var entity = await _departmentService.GetEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _departmentService.Update(entityDto, entity);

            var responseObj = new { Message = $"Департамент {entityDto.Name} успешно отредактирован!" };


            return Ok(responseObj);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteDepartmentAsync(int id)
        {
            var entity = await _departmentService.GetEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _departmentService.DeleteAsync(entity);

            var responseObj = new { Message = $"Департамент  успешно удален!" };

            return Ok(responseObj);
        }
    }
}
