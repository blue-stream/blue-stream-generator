#!/usr/bin/env node

import * as chalk from 'chalk';
import * as Ora from 'ora';
import { config } from './config';
import { Generator } from './generator/generator';
import { GitExecuter } from './git/git';
import { Questions } from './questions';
import { Template } from './util/template/template';
const figlet = require('figlet');
const boxen = require('boxen');


(async () => {
    console.log(
        chalk.default.blue(
            figlet.textSync('Generator', {
                font: 'Colossal'
            }) + chalk.default.grey('by Ron Borysovski')
        ),
    );
    console.log();

    const projectName = await Questions.getProjectName();
    const mainFeature = await Questions.getMainFeatureName();

    const branches = await GitExecuter.getBranchList(config.git.repo_url);

    const branchName = await Questions.getTemplateBranch(branches);

    const templateFetch = new Ora({
        text: 'Fetching template',
        color: 'blue'
    }).start();

    await Generator.generateTemplate(branchName, projectName, mainFeature);

    templateFetch.succeed();

    const fetchFeatures = new Ora({
        text: 'Fetching available features',
        color: 'blue'
    }).start();

    const projectPath = `${config.rootDir}/${projectName}`;
    const optionalFeatures = await Template.fetchFeatures(projectPath);

    fetchFeatures.succeed();

    const features = await Questions.getSelectedFeatures(optionalFeatures);

    const removedFeatures = optionalFeatures.filter(feature => !features.includes(feature));

    const setFeatures = new Ora({
        text: 'Applying features',
        color: 'blue'
    }).start();

    Template.applyFeatures(projectPath, removedFeatures, optionalFeatures);

    setFeatures.succeed();

    console.log(chalk.default.green(
        boxen('Template is ready!\nTo run your project:' + chalk.default.yellow(`
            cd ${projectName}
            npm install
            npm start
        `), { padding: 1 })
    ))
})();
