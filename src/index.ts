import { prompt, Answers } from 'inquirer';
import { FileUtil } from './utils/file';
import { config } from './config';
import { Questions } from './questions';
import { Generator } from './generator';

const CURR_DIR = process.cwd();

(async () => {
    const questions = await Questions.getQuestions();
    const answers: Answers = await prompt(questions);
    const template = answers['project-template'];
    const name = answers['project-name'];
    const featureName = answers['main-feature-name'];
    await Generator.generateTemplate(template, name, featureName);
})();

// Questions.getQuestions().then((questions) => {
//     prompt(questions).then((answers: Answers) => {
//         const projectTemplate = answers['project-template'];
//         const projectName = answers['project-name'];
//         const mainFeatureName = answers['main-feature-name'];
//         const templatePath = `${CURR_DIR}/tmp`;

//         fs.mkdirSync(`${CURR_DIR}/${projectName}`);

//         FileUtil.createDirectoryContents(templatePath, projectName, mainFeatureName);

//         return Generator.generateTemplate(projectTemplate, projectName, mainFeatureName);
//     });
// });