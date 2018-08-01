#!/usr/bin/env node

import { prompt, Answers } from 'inquirer';
import * as chalk from 'chalk';
import * as Ora from 'ora';
const figlet = require('figlet');

import { Generator } from './generator';
import { Questions } from './questions';

(async () => {
    console.log(
        chalk.default.blue(
            figlet.textSync('Generator', {
                font: 'colossal'
            })
        ),
        chalk.default.grey('by Ron Borysovski')
    );

    const templates = new Ora({
        text: 'Fetching templates from git repository',
        color: 'blue'
    }).start();

    const questions = await Questions.getQuestions();

    templates.succeed();

    const answers: Answers = await prompt(questions);
    const template = answers['project-template'];
    const name = answers['project-name'];
    const featureName = answers['main-feature-name'];

    const generator = new Ora({
        text: 'Generating template files',
        color: 'blue'
    }).start();

    await Generator.generateTemplate(template, name, featureName);

    generator.succeed();
})();
