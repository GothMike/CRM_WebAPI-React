using CRM_WebAPI_React.Data.Dto;
using FluentValidation;

namespace CRM_WebAPI_React.Data.Validators
{
    public class DepartmentDtoValidator : AbstractValidator<DepartmentDto>
    {
        public DepartmentDtoValidator() {
            RuleFor(e => e.Name)
                  .NotNull()
                  .NotEmpty()
                  .MinimumLength(2)
                  .MaximumLength(30);
        }
    }
}
