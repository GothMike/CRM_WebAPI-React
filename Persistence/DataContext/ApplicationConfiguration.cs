using CRM_WebAPI_React.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM_WebAPI_React.Persistence.DataContext
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(e => e.Id);

            builder
               .Property(e => e.FirstName)
               .HasMaxLength(30)
               .IsRequired();
            builder
                .Property(e => e.LastName)
                .HasMaxLength(30)
                .IsRequired();
            builder
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .HasOne(e => e.Position)
                .WithMany(p => p.Employees)
                .HasForeignKey(e => e.PositionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class PositionConfiguration : IEntityTypeConfiguration<Position>
    {
        public void Configure(EntityTypeBuilder<Position> builder)
        {
            builder.HasKey(e => e.Id);

            builder
               .Property(e => e.Name)
               .HasMaxLength(30)
               .IsRequired();
            builder
                .Property(e => e.Name)
                .HasMaxLength(30)
                .IsRequired();
        }
    }

    public class DepartamentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.HasKey(e => e.Id);

            builder
               .Property(e => e.Name)
               .HasMaxLength(30)
               .IsRequired();
            builder
                .Property(e => e.Name)
                .HasMaxLength(30)
                .IsRequired();
        }
    }
}

