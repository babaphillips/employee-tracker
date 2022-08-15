/* Insert values into department table */
INSERT INTO department (dept_name)
VALUES ("Management"), ('Sales'), ('Accounting'), ('Human Resources'), ('Reception'), ('Warehouse');

/* Insert values into roles table */
INSERT INTO roles (title, salary, department_id)
VALUES ("Warehouse Foreman", 62000, 6), ("Accountant", 50960, 3), ("Head Accountant", 57600, 3), ("Salesman", 55000, 2), ("Recepcionist", 41500, 5), ("Assistant Regional Manager", 62000, 1), ("Regional Manager", 80000, 1), ("Human Resources", 50000, 4);

/* Insert values into employee table */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 7, NULL), ("Toby", "Flenderson", 8, 1), ("Daryl", "Philbin", 1, 1), ("Kevin", "Malone", 2, 1), ("Phyllis", "Vance", 4, 1), ("Angela", "Martin", 3, 1), ("Dwight", "Schrute", 4, 1), ("Pam", "Beesly", 5, 1), ("Jim", "Halpert", 6, 1);


