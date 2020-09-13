const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
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

// Creates Team
async function createTeam(managersResponses, engineersResponses, internsResponses) {
    const managersHTML = [];
    const engineersHTML = [];
    const internsHTML = [];

    managersResponses.forEach(manager => {
        var managerFile = fs.readFileSync ("./templates/manager.html", "utf8");
        managerFile = replacePlaceholders(managerFile, "name", manager.getName());
        managerFile = replacePlaceholders(managerFile, "email", manager.getEmail());
        managerFile = replacePlaceholders(managerFile, "role", manager.getRole());
        managerFile = replacePlaceholders(managerFile, "id", manager.getId());
        managerFile = replacePlaceholders(managerFile, "officeNumber", manager.getofficeNumber());
        managersHTML.push(managerFile)
    });

    engineersResponses.forEach(engineer => {
        var engineerFile = fs.readFileSync ("./templates/manager.html", "utf8");
        engineerFile = replacePlaceholders(engineerFile, "name", engineer.getName());
        engineerFile = replacePlaceholders(engineerFile, "email", engineer.getEmail());
        engineerFile = replacePlaceholders(engineerFile, "role", engineer.getRole());
        engineerFile = replacePlaceholders(engineerFile, "id", engineer.getId());
        engineerFile = replacePlaceholders(engineerFile, "gitHub", engineer.getGithub());
        engineersHTML.push(engineerFile)
    });

    internsResponses.forEach(intern => {
        var internFile = fs.readFileSync ("./templates/manager.html", "utf8");
        internFile = replacePlaceholders(internFile, "name", intern.getName());
        internFile = replacePlaceholders(internFile, "email", intern.getEmail());
        internFile = replacePlaceholders(internFile, "role", intern.getRole());
        internFile = replacePlaceholders(internFile, "id", intern.getId());
        internFile = replacePlaceholders(internFile, "school", intern.getSchool());
        internsHTML.push(internFile)
    });

    writeHTMLFile(managersHTML, engineersHTML, internsHTML);
 
}

function writeHTMLFile(managersHTML, engineersHTML, internsHTML){
    var teamFile = fs.readFileSync ("./templates/main.html", "utf8");
    var teamHTML = [];

    teamHTML.push(managersHTML[0]);
    teamHTML.push(engineersHTML[0]);
    teamHTML.push(internsHTML[0]);

    teamHTML = teamHTML.join("");
    teamFile = replacePlaceholders(teamFile, "team", teamHTML);
    writeFileAsync("./output/team.html", teamFile);
    console.log("Your File Has Been Created!")
}

function replacePlaceholders(template, placeholder, value){
    const pattern = new RegExp("{{"+ placeholder + "}}", "gm");
    return template.replace(pattern, value);
}


(async function(){

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
    
        
    })();
    
 createTeam(managersArray, engineersArray, internsArray);

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