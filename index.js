const inquirer = require('inquirer');
const fs = require('fs');
const fileUtil = require('./utils/fileUtil');

const CURR_DIR = process.cwd();
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    },
    {
        name: 'main-feature-name',
        type: 'input',
        message: 'Main feature name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Feature name may only include letters, numbers, underscores and hashes.';
        }
    }
];


inquirer.prompt(QUESTIONS)
    .then(answers => {
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'];
        const mainFeatureName = answers['main-feature-name'];
        const templatePath = `${__dirname}/templates/${projectChoice}`;

        fs.mkdirSync(`${CURR_DIR}/${projectName}`);

        fileUtil.createDirectoryContents(templatePath, projectName, mainFeatureName);
    });

