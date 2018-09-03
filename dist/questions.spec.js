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
const inquirer_mock_1 = require("./util/inquirer-mock");
describe('Questions', () => {
    describe('#getProjectName()', function () {
        context('valid data', function () {
            let reset;
            before(function (done) {
                reset = inquirer_mock_1.mockInquirer({
                    'project-name': 'test-proj'
                });
                done();
            });
            after(function (done) {
                reset();
                done();
            });
            it('Should return generated project name', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const name = yield questions_1.Questions.getProjectName();
                    chai_1.expect(name).to.equal('test-proj');
                });
            });
        });
        context('invalid data', function () {
            it('Should throw error when project name contains invalid characters', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let hasThrown = false;
                    let reset = inquirer_mock_1.mockInquirer({
                        'project-name': 'test proj'
                    });
                    try {
                        yield questions_1.Questions.getProjectName();
                    }
                    catch (err) {
                        hasThrown = true;
                        chai_1.expect(err).to.exist;
                        chai_1.expect(err).to.have.property('message', 'Validation failed for field project-name');
                    }
                    finally {
                        reset();
                        chai_1.expect(hasThrown).to.be.true;
                    }
                });
            });
        });
    });
    describe('#getMainFeatureName()', function () {
        context('valid data', function () {
            let reset;
            before(function (done) {
                reset = inquirer_mock_1.mockInquirer({
                    'main-feature': 'test-feat'
                });
                done();
            });
            after(function (done) {
                reset();
                done();
            });
            it('Should return main feature', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const name = yield questions_1.Questions.getMainFeatureName();
                    chai_1.expect(name).to.equal('test-feat');
                });
            });
        });
        context('invalid data', function () {
            it('Should throw error when main feature name contains invalid characters', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let hasThrown = false;
                    let reset = inquirer_mock_1.mockInquirer({
                        'main-feature': 'test feat'
                    });
                    try {
                        yield questions_1.Questions.getMainFeatureName();
                    }
                    catch (err) {
                        hasThrown = true;
                        chai_1.expect(err).to.exist;
                        chai_1.expect(err).to.have.property('message', 'Validation failed for field main-feature');
                    }
                    finally {
                        reset();
                        chai_1.expect(hasThrown).to.be.true;
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=questions.spec.js.map