const mysql = require('mysql');
const inquirer = require('inquirer');


// SQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password',
    database: 'employee_db',
});

//Main Menu in Terminal
const startMenu =  () => {
    inquirer
    .prompt({
      name: 'start',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add Department','Add Role','Add Employee', "Update An Employee's Role", "Update An Employee's Manager", "Update a Role's Salary", 
      'View Departments','View Roles','View Employees', 'View Employees By Department','View Employees By Manager', "View a Department's Budget", 
      'Delete Role','Delete Department','Delete Employee','Exit']
    })
    .then
// create a switch case that will take in the users selection and start a query or function based upon selection

// create an addDepapment function query

// create an addRole function query

// create an addEmployee function query

// create an updateRole function query

// create an updateManager function query

// create an updateRole functin query

// create a viewDepapment function query

// create a viewRole function query

// creat a viewEmployees function query

// create a viewEmployeeByDeparpment function query

// creat a viewEmployeeByManager function query

// create a viewDepaprmentBudget function query

//  create a deleteRole function query

//  create a deleteDepartment function query

//  create a deleteEmployee function query

//  create exit end connection function query



// Connection and initialization
connection.connect((err) => {
    if (err) throw err;
    console.log("Welcome to the Employee Tracker")
    // add starting function
});