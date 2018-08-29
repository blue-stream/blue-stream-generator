import * as inquirer from 'inquirer';
import { isFunction } from 'util';

type MockInquirerAnswer = { [key: string]: string };

export const mockInquirer = (data: MockInquirerAnswer) => {
    const originalPrompt = inquirer.prompt;

    (<any>inquirer.prompt) = async function (questions: inquirer.Questions) {

        const answers: MockInquirerAnswer = {};

        let questionsArr: inquirer.Question[] = Array.isArray(questions) ?
            questions :
            [questions];

        for (const question of questionsArr) {
            if (question.validate && typeof question.validate === 'function') {
                if (question.validate(data[question.name!]) !== true) {
                    throw new Error(`Validation failed for field ${question.name!}`);
                }
            }

            answers[question.name!] = data[question.name!];
        }

        return answers;
    }

    return function () {
        (<any>inquirer.prompt) = originalPrompt;
    }
}