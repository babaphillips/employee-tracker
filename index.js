// npm packages
import text from "figlet";
import inquirer from "inquirer";
import db from "./db/connection.js";
// // import cTable from "console.table";

const init = () => {
  text(
    "Employee Tracker!",
    {
      font: "Doom",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
      firstStep();
    }
  );

  // initial prompt for following options : view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

  const firstStep = () => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "first",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
          ],
        },
      ])
      .then((selected) => {
        switch (selected.first) {
          // if view all dept is selected, allDepartments function will run
          case "View All Departments":
            allDepartments();
            break;
          // if view all roles is selected, allRoles function will run
          case "View All Roles":
            allRoles();
            break;
          case "View All Employees":
            allEmployees();
            break;
          case "Add A Department":
            addDepartment();
            break;
          case "Add A Role":
            addRole();
            break;
          case "Add An Employee":
            addEmployee();
            break;
          case "View All Roles":
            allRoles();
            break;
          case "Update An Employee Role":
            updateEmployeeRole();
            break;
          // if none of the answers are selected, allDepartments function will run
          default:
            allDepartments();
        }
      });
  };
};

// Create a function to initialize app
init();

// view all departments function : THEN I am presented with a formatted table showing department names and department id
function allDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
  // firstStep();
}

// view all roles function : THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

// view all employees function :THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// add department :THEN I am prompted to enter the name of the department and that department is added to the database

// add a role :THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// add an employee : THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// update an employee : THEN I am prompted to select an employee to update and their new role and this information is updated in the database
