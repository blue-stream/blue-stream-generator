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
const chalk = require("chalk");
const Ora = require("ora");
const config_1 = require("./config");
const generator_1 = require("./generator/generator");
const git_1 = require("./git/git");
const questions_1 = require("./questions");
const template_1 = require("./util/template/template");
const figlet = require('figlet');
const boxen = require('boxen');
(() => __awaiter(this, void 0, void 0, function* () {
    console.log(chalk.default.blue(figlet.textSync('Generator', {
        font: 'Colossal'
    }) + chalk.default.grey('by Ron Borysovski')));
    console.log();
    const projectName = yield questions_1.Questions.getProjectName();
    const mainFeature = yield questions_1.Questions.getMainFeatureName();
    const branches = yield git_1.GitExecuter.getBranchList(config_1.config.git.repo_url);
    const branchName = yield questions_1.Questions.getTemplateBranch(branches);
    const templateFetch = new Ora({
        text: 'Fetching template',
        color: 'blue'
    }).start();
    yield generator_1.Generator.generateTemplate(branchName, projectName, mainFeature);
    templateFetch.succeed();
    const fetchFeatures = new Ora({
        text: 'Fetching available features',
        color: 'blue'
    }).start();
    const projectPath = `${config_1.config.rootDir}/${projectName}`;
    const optionalFeatures = yield template_1.Template.fetchFeatures(projectPath);
    fetchFeatures.succeed();
    const features = yield questions_1.Questions.getSelectedFeatures(optionalFeatures);
    const removedFeatures = optionalFeatures.filter(feature => !features.includes(feature));
    const setFeatures = new Ora({
        text: 'Applying features',
        color: 'blue'
    }).start();
    template_1.Template.applyFeatures(projectPath, removedFeatures, optionalFeatures);
    setFeatures.succeed();
    console.log(chalk.default.green(boxen('Template is ready!\nTo run your project:' + chalk.default.yellow(`
            cd ${projectName}
            npm install
            npm start
        `), { padding: 1 })));
}))();
//# sourceMappingURL=index.js.map