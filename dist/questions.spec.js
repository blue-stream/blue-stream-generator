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
const questions_1 = require("./questions");
describe('Questions', () => {
    describe('#getQuestions()', () => {
        it('Should return array of questions', () => __awaiter(this, void 0, void 0, function* () {
            const questions = yield questions_1.Questions.getQuestions();
            chai_1.expect(questions).exist;
            chai_1.expect(questions).to.be.an('array');
            chai_1.expect(questions).to.have.lengthOf(3);
        }));
    });
});
//# sourceMappingURL=questions.spec.js.map