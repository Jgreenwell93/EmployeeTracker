const currentEmployeeQuery = `SELECT employee.id, CONCAT(employee.first_name, " ", 
employee.last_name) AS Employee_Name, role.title AS Title, 
role.salary AS Salary, 
department.department_name AS Department, 
coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  
AS Manager_Name
from employee
left join role on employee.role_id = role.id
left join department on role.department_id = department.id
left join employee manageron manager.id = employee.manager_id
order by employee.id;`

const departmentsQuery = 'SELECT * FROM employeedb.department;'

const rolesQuery = 'SELECT * FROM role'






exports.currentEmployeeQuery = currentEmployeeQuery
exports.departmentsQuery = departmentsQuery
exports.rolesQuery = rolesQuery;