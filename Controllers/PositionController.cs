using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Services;
using CRM_WebAPI_React.Data.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM_WebAPI_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        public IPositionService _positionService;

        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<PositionDto>))]
        public async Task<IActionResult> GetPositionsAsync()
        {
            return Ok(await _positionService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(PositionDto))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetPositionAsync(int id)
        {
            var entity = await _positionService.GetMapEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            return Ok(entity);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreatePositionAsync([FromBody] PositionDto entityDto)
        {
            if (entityDto == null)
                return BadRequest(ModelState);

            await _positionService.CreatePositionAsync(entityDto);

            return Ok($"Позиция {entityDto.Name} успешно создана!");
        }

        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdatePositionAsync(int id, [FromBody] PositionDto entityDto)
        {
            if (entityDto == null)
                return BadRequest();
            if (id != entityDto.Id)
                return BadRequest();

            var entity = await _positionService.GetEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _positionService.Update(entityDto, entity);

            return Ok($"Позиция {entity.Name} успешно отредактирована!");
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeletePositionAsync(int id)
        {
            var entity = await _positionService.GetEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            await _positionService.DeleteAsync(entity);

            return Ok($"Позиция {entity.Name} успешно удалено");
        }
    }
}
