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
const startMenu = () => {
    inquirer
        .prompt({
            name: 'start',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Add Role', 'Add Employee', "Update An Employee's Role", "Update An Employee's Manager", "Update a Role's Salary",
                'View Departments', 'View Roles', 'View Employees', 'View Employees By Department', 'View Employees By Manager', "View a Department's Budget",
                'Delete Role', 'Delete Department', 'Delete Employee', 'Exit']
        })
        .then((answer => {
            switch (answer.start) {
                case "Add Employee":
                    addEmployee();
                    break
                case "Add Role":
                    addRole();
                    break
                case "Add Department":
                    addDepartment();
                    break
                case "Update An Employee's Role":
                    updateRole();
                    break
                case "Update An Employee's Manager":
                    updateManager();
                    break
                case "Update a Role's Salary":
                    updateSalary();
                    break
                case "View Departments":
                    viewDepartments();
                    break
                case "View Roles":
                    viewRoles();
                    break
                case "View Employees":
                    viewAllEmp();
                    break
                case "View Employees By Department":
                    viewByDepartment();
                    break
                case "View Employees By Manager":
                    viewByManager();
                    break
                case "View a Department's Budget":
                    departmentBudget();
                    break
                case "Delete Employee":
                    deleteEmployee();
                    break
                case "Delete Role":
                    deleteRole();
                    break
                case "Delete Department":
                    deleteDepartment();
                    break
                case "Exit":
                    console.log(exitAscii)
                    connection.end();
                    break
            }

            //Adding a deparpment function that allows a user to add a department with an insert query
            addDepartment = () => {
                inquirer
                    .prompt([
                        {
                            name: 'department',
                            type: 'input',
                            message: "Name of Department:"
                        }
                    ]).then((answer => {

                        const query = `INSERT INTO department (department_name) VALUES ('${answer.department}')`
                        connection.query(query, (err, res) => {
                            if (err) throw err
                            connection.query("SELECT * FROM employeedb.department;", (err, res) => {
                                if (err) throw err
                                console.table(res)
                                console.log(`\n${answer.department} has been added to your departments!\n`)
                                addAdditionalDept();
                            })
                        })

                    }))
            }
            //addAdditionalDept function that asks user if they want to add another Department. Calls back addDepartment() if Yes
            addAdditionalDept = () => {
                addAnother =
                {
                    name: 'addDepartment',
                    type: 'list',
                    message: "Would you like to add another department?",
                    choices: ['Yes', 'No']
                }

                inquirer
                    .prompt(addAnother)
                    .then((answer => {
                        if (answer.addDepartment === 'Yes') {
                            addDepartment();
                            return;
                        } else startMenu();
                    })
                    )
            }


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