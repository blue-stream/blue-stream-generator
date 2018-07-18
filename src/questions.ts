import * as fs from 'fs';
import { config } from './config';
import { GitService } from './git/git.service';

const CHOICES = fs.readdirSync(config.templatePath);

export const QUESTIONS = [
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
        validate: function (input: string) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    },
    {
        name: 'main-feature-name',
        type: 'input',
        message: 'Main feature name:',
        validate: function (input: string) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Feature name may only include letters, numbers, underscores and hashes.';
        }
    }
];

export class Questions {
    static async getQuestions() {
        const templates: string[] = await GitService.getTemplates();

        return [
            {
                name: 'project-template',
                type: 'list',
                message: 'What project template would you like to generate?',
                choices: templates
            },
            {
                name: 'project-name',
                type: 'input',
                message: 'Project name:',
                validate: function (input: string) {
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'Project name may only include letters, numbers, underscores and hashes.';
                }
            },
            {
                name: 'main-feature-name',
                type: 'input',
                message: 'Main feature name:',
                validate: function (input: string) {
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'Feature name may only include letters, numbers, underscores and hashes.';
                }
            }
        ];
    }
}