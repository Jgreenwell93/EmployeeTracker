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


            //addRole function that lets a users to add a role. 
            addRole = () => {
                connection.query('SELECT * FROM department', (err, res) => {
                    if (err) throw (err);
                    const deptChoices = res.map((department) => {
                        return {
                            name: department.department_name,
                            value: department.id
                        }
                    })
                    inquirer
                        .prompt([
                            {
                                name: 'role',
                                type: 'input',
                                message: "Title of Role:"
                            },
                            {
                                name: 'salary',
                                type: 'input',
                                message: "What is the role's average salary?:"
                            },
                            {
                                name: 'department',
                                type: 'list',
                                message: "Which department does this role belong:",
                                choices: deptChoices
                            },
                        ]).then((answer => {

                            const query = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.role}', '${answer.salary}', '${answer.department}')`
                            connection.query(query, (err, res) => {
                                if (err) throw err
                                connection.query("SELECT * FROM employeedb.role;", (err, res) => {
                                    if (err) throw err
                                    console.table(res)
                                    console.log(`\n${answer.role} has been added to your roles!\n`)
                                    addAdditionalRole();
                                })
                            })

                        }))
                })
            }
            // function that requests a user if they would like to create another role. Calls back addRole function if Yes.
            addAdditionalRole = () => {
                addAnother =
                {
                    name: 'addRole',
                    type: 'list',
                    message: "Would you like to add another role?",
                    choices: ['Yes', 'No']
                }

                inquirer
                    .prompt(addAnother)
                    .then((answer => {
                        if (answer.addRole === 'Yes') {
                            addRole();
                            return;
                        } else startMenu();
                    })
                    )
            }

            //Function that prompts user for info on the employee they'd like to add
            addEmployee = () => {
                connection.query(queries.rolesQuery, (err, res) => {
                    if (err) throw (err);
                    const roleChoices = res.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                    connection.query(queries.employeeTableQuery, (err, res) => {
                        if (err) throw (err);
                        const managerChoices = res.map((employee) => {
                            return {
                                name: `${employee.first_name} ${employee.last_name}`,
                                value: employee.id
                            }
                        })
                        managerChoices.push("None")
                        inquirer
                            .prompt([
                                {
                                    name: 'firstName',
                                    type: 'input',
                                    message: "Employee First Name:"
                                },
                                {
                                    name: 'lastName',
                                    type: 'input',
                                    message: "Employee Last Name:"
                                },
                                {
                                    name: 'role',
                                    type: 'list',
                                    message: "Select Role:",
                                    choices: roleChoices
                                },
                                {
                                    name: 'hasManager',
                                    type: 'list',
                                    message: "Does this employee have a manager?",
                                    choices: ['Yes', 'No']
                                }
                            ]).then((answer => {
                                switch (answer.hasManager) {
                                    case "No":
                                        const insertEmpQuery = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.role}')`
                                        connection.query(insertEmpQuery, (err, res) => {
                                            if (err) throw err
                                            connection.query(queries.currentEmployeeQuery, (err, res) => {
                                                if (err) throw err
                                                console.table(res)
                                                console.log(`${answer.firstName} ${answer.lastName} has been added to your employees!`)
                                                addAdditionalEmployee();
                                            })
                                        })
                                        break
                                    case "Yes":
                                        selectManager(managerChoices, answer);
                                        break
                                }
                            }))
                    })
                })
            }

            //addEmployee addional function that lets a user select a manager if one exists
            const selectManager = (managerChoices, answer) => {
                inquirer
                    .prompt([
                        {
                            name: 'managerName',
                            type: 'list',
                            message: "Select Employee's Manager",
                            choices: managerChoices
                        }
                    ]).then((mgrAnswer => {
                        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.role}', '${mgrAnswer.managerName}')`
                        connection.query(query, (err, res) => {
                            if (err) throw err
                            connection.query(queries.currentEmployeeQuery, (err, res) => {
                                if (err) throw err
                                console.table(res)
                                console.log(`${answer.firstName} ${answer.lastName} has been added to your employees!\n`)
                                addAdditionalEmployee();
                            })
                        })
                    }))
            }

            // function that asks a user if they want to add another employee. If yes, calls back addEmployee function, else loops back to start
            addAdditionalEmployee = () => {
                addAnother =
                {
                    name: 'addEmployee',
                    type: 'list',
                    message: "Would you like to add another employee?",
                    choices: ['Yes', 'No']
                }

                inquirer
                    .prompt(addAnother)
                    .then((answer => {
                        if (answer.addEmployee === 'Yes') {
                            addEmployee();
                            return;
                        } else startMenu();
                    })
                    )
            }

            // create an updateRole function query

            // create an updateManager function query

            // create an updateRole functin query


            const viewDepartments = () => {
                console.log(`\n`)
                console.log('----------ALL DEPARTMENTS---------')
                connection.query(queries.departmentsQuery, (err, data) => {
                    if (err) throw err
                    console.table(data)
                    console.log(`\n`)
                    //    add return menu call back after built
                })
            }



            const viewRoles = () => {
                console.log(`\n`)
                console.log('-------------ALL ROLES------------')
                const allRolesQuery = "SELECT * FROM employeedb.role;"
                connection.query(allRolesQuery, (err, data) => {
                    if (err) throw err
                    console.table(data)
                    console.log(`\n`)
                    //    add return menu call back after built
                })
            }


            const viewAllEmp = () => {
                console.log(`\n`)
                console.log('---------------------------------ALL CURRENT EMPLOYEES---------------------------------')
                connection.query(queries.currentEmployeeQuery, (err, data) => {
                    if (err) throw err
                    console.table(data)
                    //    add return menu call back after built
                })
            }

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