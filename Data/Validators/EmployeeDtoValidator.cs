using CRM_WebAPI_React.Data.Dto;
using FluentValidation;


namespace CRM_WebAPI_React.Data.Validators

{
    public class EmployeeDtoValidator : AbstractValidator<EmployeeDto>
    {
        public EmployeeDtoValidator()
        {
            RuleFor(e => e.FirstName)
               .NotNull()
               .NotEmpty()
               .MinimumLength(2)
               .MaximumLength(30);

            RuleFor(e => e.LastName)
                .NotNull()
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(30);
        }
    }
}
