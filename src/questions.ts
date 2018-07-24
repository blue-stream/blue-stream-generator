import { GitService } from './git.service';

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
                message: `Main feature name:`,
                validate: function (input: string) {
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'Feature name may only include letters, numbers, underscores and hashes.';
                }
            }
        ];
    }
}