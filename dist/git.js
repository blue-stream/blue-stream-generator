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
const child_process_1 = require("child_process");
const config_1 = require("./config");
const fs_extra_1 = require("fs-extra");
const fs = require("fs");
class GitExecuter {
    static asyncExec(command) {
        return new Promise((resolve, reject) => {
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    }
    /**
    * Fetch templates from git repository
    * All templates are git branches with prefix "template-"
    * @returns Promise of string array containing template names
    * @example
    * //Returns
    * ['main', 'with-db', 'with-ci']
    */
    static getBranchList() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield GitExecuter.asyncExec(`git ls-remote ${config_1.config.git.repo_url}`);
            let branches = result.match(/refs\/.+/g);
            if (branches) {
                branches = branches.filter(branch => branch.includes('template-'))
                    .map(branch => branch.replace(/.+template-/, ''));
                return branches;
            }
            return [];
        });
    }
    /**
     * Clone a specific branch to workspace.
     * @param branch {string} Branch to clone
     * @param destinationPath {string} Path to clone repository
     */
    static cloneSpecificBranch(branch, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(destinationPath)) {
                fs_extra_1.mkdirpSync(destinationPath);
            }
            yield GitExecuter.asyncExec(`git clone --single-branch -b ${branch} ${config_1.config.git.repo_url} ${destinationPath}/.`);
        });
    }
}
exports.GitExecuter = GitExecuter;
//# sourceMappingURL=git.js.map