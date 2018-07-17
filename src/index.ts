import { prompt, Answers } from 'inquirer';
import { FileUtil } from './utils/file';
import * as fs from 'fs';
import { config } from './config';
import { QUESTIONS } from './questions';

const CURR_DIR = process.cwd();

prompt(QUESTIONS)
    .then((answers: Answers) => {
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'];
        const mainFeatureName = answers['main-feature-name'];
        const templatePath = `${config.templatePath}/${projectChoice}`;

        fs.mkdirSync(`${CURR_DIR}/${projectName}`);

        FileUtil.createDirectoryContents(templatePath, projectName, mainFeatureName);
    });

