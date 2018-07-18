import { prompt, Answers } from 'inquirer';
import { FileUtil } from './utils/file';
import * as fs from 'fs';
import { config } from './config';
import { Questions } from './questions';

const CURR_DIR = process.cwd();

Questions.getQuestions().then((questions) => {
    prompt(questions).then((answers: Answers) => {
        const projectTemplate = answers['project-template'];
        const projectName = answers['project-name'];
        const mainFeatureName = answers['main-feature-name'];
        const templatePath = `${CURR_DIR}/tmp`;

        fs.mkdirSync(`${CURR_DIR}/${projectName}`);

        FileUtil.createDirectoryContents(templatePath, projectName, mainFeatureName);
    });
});