const db = require("./connection");

class DB {
  constructor(db) {
    this.db = db;
  }
  // view all departments function : THEN I am presented with a formatted table showing department names and department id
  findDepts() {
    return this.db.promise().query("SELECT * FROM department;");
  }

  // view all roles function : THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  findRoles() {
    return this.db
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
      );
  }

  //:THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report tp
  findEmployees() {
    return this.db
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  createDept(name) {
    return this.db.promise().query("INSERT INTO department SET ?", name);
  }

  createRole(role) {
    return this.db.promise().query("INSERT INTO role SET ?", role);
  }

  createEmployee(employee) {
    return this.db.promise().query("INSERT INTO employee SET ?", employee);
  }

  updateEmployeeRole(updatedEmployee) {
    return this.db
      .promise()
      .query(
        "UPDATE employee SET role_id = ${role_id} WHERE id = ${employees}",
        updatedEmployee
      );
  }
}

module.exports = new DB(db);
