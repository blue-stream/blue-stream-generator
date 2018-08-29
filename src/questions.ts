import { prompt, Answers } from 'inquirer';

export class Questions {

    static async getProjectName(): Promise<string> {
        const answer: Answers = await prompt([{
            name: 'project-name',
            type: 'input',
            message: 'Project name',
            validate: function (input: string) {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'Project name may only include letters, numbers, underscores and hashes.';
            }
        }]);

        return answer['project-name'];
    }

    static async getMainFeatureName(): Promise<string> {
        const answer: Answers = await prompt([{
            name: 'main-feature',
            type: 'input',
            message: 'Main feature name',
            validate: function (input: string) {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'Feature name may only include letters, numbers, underscores and hashes.';
            }
        }]);

        return answer['main-feature'];
    }

    static async getSelectedFeatures(features: string[]): Promise<string[]> {
        const answer: Answers = await prompt([{
            type: 'checkbox',
            message: 'Select features to enable',
            name: 'selected-features',
            choices: features.map(feature => ({
                name: feature,
                checked: true
            })),
        }]);

        return answer['selected-features'];
    }
}