#!/usr/bin/env node

import { prompt, Answers } from 'inquirer';
import * as chalk from 'chalk';
import * as Ora from 'ora';
const figlet = require('figlet');
const boxen = require('boxen');

import { Generator } from './generator/generator';
import { Questions } from './questions';
import { Template } from './util/template/template';
import { config } from './config';

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

    const templateFetch = new Ora({
        text: 'Fetching template',
        color: 'blue'
    }).start();

    await Generator.generateTemplate(projectName, mainFeature);

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
