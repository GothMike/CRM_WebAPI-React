using CRM_WebAPI_React.Data.Models;

namespace CRM_WebAPI_React.Data.Repositories.Interfaces
{
    /// <summary>
    /// Интерфейс для взаимодействия с хранилищем сотрудников.
    /// </summary>
    public interface IEmployeeRepository
    {
        /// <summary>
        /// Получает всех сотрудников по идентификатору должности.
        /// </summary>
        /// <param name="positionId">Идентификатор должности.</param>
        /// <returns>Коллекция сотрудников, занимающих данную должность.</returns>
        Task<IEnumerable<Employee>> GetAllEmployeesByPosition(int positionId);

        /// <summary>
        /// Получает всех сотрудников по идентификатору отдела.
        /// </summary>
        /// <param name="departmentId">Идентификатор отдела.</param>
        /// <returns>Коллекция сотрудников, работающих в данном отделе.</returns>
        Task<IEnumerable<Employee>> GetAllEmployeesByDepartment(int departmentId);

        /// <summary>
        /// Получает всех сотрудников, занимающих должность руководителя
        /// </summary>
        /// <param name="isAManagerPosition">Флаг, указывающий, является ли должность руководящей (true) или нет (false).</param>
        /// <returns>Коллекция сотрудников, занимающих указанную должность.</returns>
        Task<IEnumerable<Employee>> GetAllEmployeesByManagerPosition(bool isAManagerPosition);
    }
}
