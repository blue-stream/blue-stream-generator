import { GitExecuter } from './git';

export class Questions {
    static async getQuestions() {
        const templates: string[] = await GitExecuter.getBranchList();

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