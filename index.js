// import npm packages
const figlet = require("figlet");
const inquirer = require("inquirer");
require("console.table");

const db = require("./db");

// function that initiates my employee tracker title and runs firstStep function after it
function init() {
  figlet.text(
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
      // will start first prompts necessary as asked in the acceptance criteria
    }
  );
}

// initial prompt for following options :
function firstStep() {
  inquirer
    .prompt([
      {
        //view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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
          process.exit();
      }
    });
}

function allDepartments() {
  db.findDepts()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => firstStep());
}

// view all roles function : THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

function allRoles() {
  db.findRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => firstStep());
}

function allEmployees() {
  db.findEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => firstStep());
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
        db.createDept(answer).then(() => firstStep());
      })
  );
}

// add a role function
function addRole() {
  db.findDepts().then(([table]) => {
    let department = table;
    const deptList = department.map(({ id, name }) => ({
      name: `${name}`,
      value: id,
    }));
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
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: deptList,
          },
        ])
        .then((answer) => {
          db.createRole(answer).then(() => firstStep());
        })
    );
  });
}

// add a employee function
function addEmployee() {
  db.findRoles().then(([table]) => {
    let role = table;
    const roleList = role.map(({ id, title }) => ({
      name: `${title}`,
      value: id,
    }));
    db.findEmployees().then(([table]) => {
      let employee = table;
      const employeeList = employee.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      return (
        inquirer
          //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the first name of this employee? (Required)",
              validate: (first_nameInput) => {
                if (first_nameInput) {
                  return true;
                } else {
                  console.log("Please enter the first name of this employee");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the last name of this employee? (Required)",
              validate: (last_nameInput) => {
                if (last_nameInput) {
                  return true;
                } else {
                  console.log("Please enter the last name of this employee");
                  return false;
                }
              },
            },
            {
              type: "list",
              name: "role_id",
              message: "Which role does this employee belong to?",
              choices: roleList,
            },
            {
              type: "list",
              name: "manager_id",
              message: "Who is the manager for the employee? (Required)",
              choices: employeeList,
            },
          ])
          .then((answer) => {
            db.createEmployee(answer).then(() => firstStep());
          })
      );
    });
  });
}
// and that role is added to the database

// update employee function
function updateEmployeeRole() {
  db.findEmployees().then(([table]) => {
    let employee = table;
    const employeeList = employee.map(({ first_name, last_name, id }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    db.findRoles().then(([table]) => {
      let role = table;
      const roleList = role.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      inquirer
        //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        .prompt([
          {
            type: "list",
            name: "empId",
            message: "Which employee do you want to update?",
            choices: employeeList,
          },
          {
            type: "list",
            name: "role_id",
            message: "Which role does this employee belong to?",
            choices: roleList,
          },
        ])
        .then((answer) => {
          const role_id = answer.role_id;
          const empId = answer.empId;
          db.updateEmployeeRole(empId, role_id).then(() => firstStep());
        });
    });
  });
}

// Create a function to initialize app
init();
