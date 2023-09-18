using CRM_WebAPI_React.Data.Repositories.Interfaces;
using CRM_WebAPI_React.Data.Repositories;
using CRM_WebAPI_React.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using CRM_WebAPI_React.Persistence.UnitOfWork;
using CRM_WebAPI_React.Persistence.Fabric.Interfaces;
using CRM_WebAPI_React.Persistence.Factory;
using FluentValidation.AspNetCore;
using System.Reflection;
using CRM_WebAPI_React.Data.Services.Interfaces;
using CRM_WebAPI_React.Data.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()   
    .AddFluentValidation(c =>
    c.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Сервисы
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();


// Репозитории и обработка данных
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IRepositoryFactory, RepositoryFactory>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
