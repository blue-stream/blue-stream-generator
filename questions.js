const fs = require('fs');
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

module.exports = questions = [
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
        validate: input => {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                return true;
            }

            return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];