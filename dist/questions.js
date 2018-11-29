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
class Questions {
    static getProjectName() {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield inquirer_1.prompt([{
                    name: 'project-name',
                    type: 'input',
                    message: 'Project name',
                    validate: function (input) {
                        if (/^([A-Za-z\-\_\d])+$/.test(input))
                            return true;
                        else
                            return 'Project name may only include letters, numbers, underscores and hashes.';
                    }
                }]);
            return answer['project-name'];
        });
    }
    static getMainFeatureName() {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield inquirer_1.prompt([{
                    name: 'main-feature',
                    type: 'input',
                    message: 'Main feature name',
                    validate: function (input) {
                        if (/^([A-Za-z\-\_\d])+$/.test(input))
                            return true;
                        else
                            return 'Feature name may only include letters, numbers, underscores and hashes.';
                    }
                }]);
            return answer['main-feature'];
        });
    }
    static getSelectedFeatures(features) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield inquirer_1.prompt([{
                    type: 'checkbox',
                    message: 'Select features to enable',
                    name: 'selected-features',
                    choices: features.map(feature => ({
                        name: feature,
                        checked: true
                    })),
                }]);
            return answer['selected-features'];
        });
    }
    static getTemplateBranch(branches) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield inquirer_1.prompt([{
                    type: 'list',
                    message: 'Use branch',
                    name: 'branch-name',
                    choices: branches,
                }]);
            return answer['branch-name'];
        });
    }
}
exports.Questions = Questions;
//# sourceMappingURL=questions.js.map