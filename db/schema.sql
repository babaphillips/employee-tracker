/* Create dabatase */
DROP DATABASE IF EXISTS theoffice;
CREATE DATABASE theoffice;
USE theoffice;

/* Create department table */
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(45) NOT NULL
);

/* Create roles table */
CREATE TABLE roles (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

/* Create employee table */
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);