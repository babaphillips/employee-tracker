// import npm packages
import text from "figlet";
import inquirer from "inquirer";
import db from "./db/connection.js";
// // import cTable from "console.table";

function init() {
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
  function firstStep() {
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
            "Exit",
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
          // if none of the answers are selected, exit function will run
          default:
            exit();
        }
      });
  }
}

// Create a function to initialize app
init();

// view all departments function : THEN I am presented with a formatted table showing department names and department id
function allDepartments() {
  const sql = `SELECT id AS ID, dept_name AS Department_Name FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
  // init();
}

// view all roles function : THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

function allRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    // firstStep();
  });
}

// view all employees function :THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function allEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    // firstStep();
  });
}

// add department function
function addDepartment() {
  return (
    inquirer
      //THEN I am prompted to enter the name of the department
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department? (Required)",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the name of the department");
              return false;
            }
          },
        },
      ])
      // and that department is added to the database
      .then((answer) => {
        // not using the const sql here - trying a different method
        db.query(
          "INSERT INTO department SET ?",
          { dept_name: answer.name },
          (err) => {
            if (err) throw err;
            console.log("New department was added into The Office Database");
          }
        );
      })
  );
}

// add a role function
function addRole() {
  return (
    inquirer
      //THEN I am prompted to enter the name, salary, and department for the role and
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of this role? (Required)",
          validate: (titleInput) => {
            if (titleInput) {
              return true;
            } else {
              console.log("Please enter the title of this role");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role? (Required)",
          validate: (salaryInput) => {
            if (salaryInput) {
              return true;
            } else {
              console.log("Please enter the salary of this role");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "dept",
          message: "What is the name of the department? (Required)",
          validate: (deptInput) => {
            if (deptInput) {
              return true;
            } else {
              console.log("Please enter the name of the department");
              return false;
            }
          },
        },
      ])
      // and that role is added to the database
      .then((answer) => {
        // not using the const sql here - trying a different method
        db.query(
          "INSERT INTO role SET ?",
          { title: answer.title, salary: answer.salary },
          (err) => {
            if (err) throw err;
            console.log("New role was added into The Office Database");
          }
        );
      })
  );
}

// add an employee : THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// update an employee : THEN I am prompted to select an employee to update and their new role and this information is updated in the database
