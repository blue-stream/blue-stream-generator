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
const fs = require("fs");
const chai_1 = require("chai");
const fs_extra_1 = require("fs-extra");
const git_1 = require("./git");
describe('GitService', () => {
    describe('#cloneBranch()', () => {
        it('Should clone branch into work-space', () => __awaiter(this, void 0, void 0, function* () {
            const path = `${process.cwd()}/test_clone`;
            yield git_1.GitExecuter.cloneSpecificBranch('master', path);
            chai_1.expect(fs.existsSync(path)).to.be.true;
            yield fs_extra_1.remove(path);
        }));
        it('Should throw error when branch not exists', () => __awaiter(this, void 0, void 0, function* () {
            const path = `${process.cwd()}/test_clone`;
            let hasError = false;
            try {
                yield git_1.GitExecuter.cloneSpecificBranch('unknown_branch', path);
            }
            catch (err) {
                hasError = true;
                chai_1.expect(err).to.exist;
                chai_1.expect(err).to.contain('Could not find remote branch');
            }
            chai_1.expect(hasError).to.be.true;
        }));
    });
});
//# sourceMappingURL=git.spec.js.map