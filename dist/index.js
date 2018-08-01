#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const chalk = require("chalk");
const Ora = require("ora");
const figlet = require('figlet');
const generator_1 = require("./generator");
const questions_1 = require("./questions");
(() => __awaiter(this, void 0, void 0, function* () {
    console.log(chalk.default.blue(figlet.textSync('Generator', {
        font: 'colossal'
    })), chalk.default.grey('by Ron Borysovski'));
    const templates = new Ora({
        text: 'Fetching templates from git repository',
        color: 'blue'
    }).start();
    const questions = yield questions_1.Questions.getQuestions();
    templates.succeed();
    const answers = yield inquirer_1.prompt(questions);
    const template = answers['project-template'];
    const name = answers['project-name'];
    const featureName = answers['main-feature-name'];
    const generator = new Ora({
        text: 'Generating template files',
        color: 'blue'
    }).start();
    yield generator_1.Generator.generateTemplate(template, name, featureName);
    generator.succeed();
}))();
//# sourceMappingURL=index.js.map