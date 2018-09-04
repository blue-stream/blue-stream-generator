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
const inquirer = require("inquirer");
exports.mockInquirer = (data) => {
    const originalPrompt = inquirer.prompt;
    inquirer.prompt = function (questions) {
        return __awaiter(this, void 0, void 0, function* () {
            const answers = {};
            let questionsArr = Array.isArray(questions) ?
                questions :
                [questions];
            for (const question of questionsArr) {
                if (question.validate && typeof question.validate === 'function') {
                    if (question.validate(data[question.name]) !== true) {
                        throw new Error(`Validation failed for field ${question.name}`);
                    }
                }
                answers[question.name] = data[question.name];
            }
            return answers;
        });
    };
    return function () {
        inquirer.prompt = originalPrompt;
    };
};
//# sourceMappingURL=inquirer-mock.js.map