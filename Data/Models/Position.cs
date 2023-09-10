namespace CRM_WebAPI_React.Data.Models
{
    public class Position
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAManagerPosition { get; set; }
        public ICollection<Employee>? Employees { get; set; }
    }
}
