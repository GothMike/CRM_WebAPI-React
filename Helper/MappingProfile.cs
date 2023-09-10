using AutoMapper;
using CRM_WebAPI_React.Data.Dto;
using CRM_WebAPI_React.Data.Models;

namespace CRM_WebAPI_React.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<Position, PositionDto>().ReverseMap();
            CreateMap<Employee, EmployeeDto>().ReverseMap();
        }
    }
}
