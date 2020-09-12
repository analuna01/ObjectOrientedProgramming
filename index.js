const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


// Manager promt Questions

const managerQuestions = [

    {
        name: "id",
        message: "Enter manager's ID:"
    },

    {
        name: "name",
        message: "Enter manager's name:"
    },

    {
        name: "email",
        message: "Enter manager's email:"
    },

    {
        name: "officeNumber",
        message: "Enter your office number:"
    },

];

// Engineer prompt questions:
const engineerQuestions = [
    {
        name: "id",
        message: "Enter engineer's ID"
    },
    
    {
        name: "name",
        message: "Enter engineer's name:"
    },

    {
        name: "email",
        message: "Enter engineer's email:"
    },

    {
        name: "gitHub",
        message: "Enter your Github URL:"
    },
];

// Intern prompt questions:
const internQuestions = [
    {
        name: "id",
        message: "Enter intern's ID"
    },
    
    {
        name: "name",
        message: "Enter intern's name:"
    },

    {
        name: "email",
        message: "Enter intern's email:"
    },

    {
        name: "school",
        message: "Enter your school:"
    },
];

// Organizes array of questions for manager, engineer and intern
const managersArray = [];
const engineersArray = [];
const internsArray = [];

// Promts questions for each employee
inquirer
.prompt(managerQuestions, async function(response){
    const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
    managersArray.push(newManager);
}).then(async function(){
    await 
    inquirer
    .prompt(engineerQuestions, async function(response){
        const newEngineer = new Engineer(response.name, response.id, response.email, response.gitHub);
        engineersArray.push(newEngineer);
    }).then (async function(){
        await
        inquirer
        .prompt(internQuestions, async function(response){
            const newIntern = new Intern(response.name, response.id, response.email, response.school);
            internsArray.push(newIntern);
        });
    });
});


// inquirer.prompt(questions).then(response =>{
//     fs.accessSync("./manager.html", (response.name) + {name} , function(error) {
//         if (error){
//             return console.log(error);
//         }
//         console.log("success!")
//     });

// })



// const questions = [
//     {
//         name: "name",
//         message: "Enter your full name"
//     },
    
//     {
//         type: "checkbox",
//         name: "role",
//         message: "Select your role",
//         choices: [
//             "Manager",
//             "Engineer",
//             "Intern",
//         ]
//     },
//     {
//         name: "email",
//         message: "Enter your email address"
//     },
//     {
//         name: "id",
//         message: "Enter your employee ID"
//     },
//     {
//         name: "officeNumber",
//         message: "Enter your office number"
//     }
    
// ]