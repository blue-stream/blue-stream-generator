"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("./string");
const chai_1 = require("chai");
describe('StringUtil', () => {
    describe('#toCamelCase()', () => {
        it('Should convert dash-separated string to camelCase', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('hello-world')).to.equal('helloWorld');
            done();
        });
        it('Should convert space-separated string to camelCase', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('type script')).to.equal('typeScript');
            done();
        });
        it('Should convert PascalCase string to camelCase', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('PascalCase')).to.equal('pascalCase');
            done();
        });
        it('Should ignore whitespaces', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('white    spaces ignore')).to.equal('whiteSpacesIgnore');
            done();
        });
        it('Should ignore spaciel characters', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('ignore@spaciel $characters *')).to.equal('ignoreSpacielCharacters');
            done();
        });
        it('Should not change camelCase string', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('camelCaseString')).to.equal('camelCaseString');
            done();
        });
        it('Should convert to camelCase when string include number', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('test number 20')).to.equal('testNumber 20');
            chai_1.expect(string_1.StringUtil.toCamelCase('test number20')).to.equal('testNumber20');
            done();
        });
        it('Should convert to camelCase when string built from CAPITAL letters', (done) => {
            chai_1.expect(string_1.StringUtil.toCamelCase('CAPS LOCK')).to.equal('capsLock');
            done();
        });
    });
    describe('#toPascalCase()', () => {
        it('Should convert dash-separated string to PascalCase', (done) => {
            chai_1.expect(string_1.StringUtil.toPascalCase('hello-world')).to.be.equal('HelloWorld');
            done();
        });
        it('Should convert space-separated string to PascalCase', (done) => {
            chai_1.expect(string_1.StringUtil.toPascalCase('type Script')).to.be.equal('TypeScript');
            done();
        });
        it('Should convert camelCase to PascalCase', (done) => {
            chai_1.expect(string_1.StringUtil.toPascalCase('camelCase')).to.be.equal('CamelCase');
            done();
        });
        it('Should ignore white-spaces', (done) => {
            chai_1.expect(string_1.StringUtil.toPascalCase('ignore WHITE    Spaces')).to.be.equal('IgnoreWhiteSpaces');
            done();
        });
        it('Should ignore spaciel characters', (done) => {
            chai_1.expect(string_1.StringUtil.toPascalCase('ignore@spaciel $characters *')).to.equal('IgnoreSpacielCharacters');
            done();
        });
        it('Should not change PascalCase string', (done) => {
            chai_1.expect(string_1.StringUtil.toPascalCase('PascalCase')).to.be.equal('PascalCase');
            done();
        });
    });
});
//# sourceMappingURL=string.spec.js.map