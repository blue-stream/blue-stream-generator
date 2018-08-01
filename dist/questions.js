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
const git_1 = require("./git");
class Questions {
    static getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const templates = yield git_1.GitExecuter.getBranchList();
            return [
                {
                    name: 'project-template',
                    type: 'list',
                    message: 'What project template would you like to generate?',
                    choices: templates
                },
                {
                    name: 'project-name',
                    type: 'input',
                    message: 'Project name:',
                    validate: function (input) {
                        if (/^([A-Za-z\-\_\d])+$/.test(input))
                            return true;
                        else
                            return 'Project name may only include letters, numbers, underscores and hashes.';
                    }
                },
                {
                    name: 'main-feature-name',
                    type: 'input',
                    message: `Main feature name:`,
                    validate: function (input) {
                        if (/^([A-Za-z\-\_\d])+$/.test(input))
                            return true;
                        else
                            return 'Feature name may only include letters, numbers, underscores and hashes.';
                    }
                }
            ];
        });
    }
}
exports.Questions = Questions;
//# sourceMappingURL=questions.js.map