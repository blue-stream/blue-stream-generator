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
const chai_1 = require("chai");
const fs = require("fs");
const generator_1 = require("./generator");
const fs_extra_1 = require("fs-extra");
describe('Generator', () => {
    describe('#generateTemplate()', () => {
        it('Should generate template', () => __awaiter(this, void 0, void 0, function* () {
            const path = `${process.cwd()}/generator`;
            chai_1.expect(fs.existsSync(path)).to.be.false;
            yield generator_1.Generator.generateTemplate('master', 'generator', 'feat');
            chai_1.expect(fs.existsSync(path)).to.be.true;
            yield fs_extra_1.remove(path);
            chai_1.expect(fs.existsSync(path)).to.be.false;
        }));
    });
});
//# sourceMappingURL=generator.spec.js.map