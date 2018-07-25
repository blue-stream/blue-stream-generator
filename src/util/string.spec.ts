import { StringUtil } from "./string";
import { expect } from 'chai';

describe('StringUtil', () => {
    describe('#toCamelCase()', () => {
        it('Should convert dash-separated string to camelCase', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('hello-world')).to.equal('helloWorld');
            done()
        });

        it('Should convert space-separated string to camelCase', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('type script')).to.equal('typeScript');
            done()
        });

        it('Should convert PascalCase string to camelCase', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('PascalCase')).to.equal('pascalCase');
            done()
        });

        it('Should ignore whitespaces', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('white    spaces ignore')).to.equal('whiteSpacesIgnore');
            done()
        });

        it('Should ignore spaciel characters', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('ignore@spaciel $characters *')).to.equal('ignoreSpacielCharacters');
            done()
        });

        it('Should not change camelCase string', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('camelCaseString')).to.equal('camelCaseString');
            done();
        });

        it('Should convert to camelCase when string include number', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('test number 20')).to.equal('testNumber 20');
            expect(StringUtil.toCamelCase('test number20')).to.equal('testNumber20');
            done();
        });

        it('Should convert to camelCase when string built from CAPITAL letters', (done: MochaDone) => {
            expect(StringUtil.toCamelCase('CAPS LOCK')).to.equal('capsLock');
            done();
        });
    });

    describe('#toPascalCase()', () => {
        it('Should convert dash-separated string to PascalCase', (done: MochaDone) => {
            expect(StringUtil.toPascalCase('hello-world')).to.be.equal('HelloWorld');
            done();
        });

        it('Should convert space-separated string to PascalCase', (done: MochaDone) => {
            expect(StringUtil.toPascalCase('type Script')).to.be.equal('TypeScript');
            done();
        });

        it('Should convert camelCase to PascalCase', (done: MochaDone) => {
            expect(StringUtil.toPascalCase('camelCase')).to.be.equal('CamelCase');
            done();
        });

        it('Should ignore white-spaces', (done: MochaDone) => {
            expect(StringUtil.toPascalCase('ignore WHITE    Spaces')).to.be.equal('IgnoreWhiteSpaces');
            done();
        });

        it('Should ignore spaciel characters', (done: MochaDone) => {
            expect(StringUtil.toPascalCase('ignore@spaciel $characters *')).to.equal('IgnoreSpacielCharacters');
            done();
        });

        it('Should not change PascalCase string', (done: MochaDone) => {
            expect(StringUtil.toPascalCase('PascalCase')).to.be.equal('PascalCase');
            done();
        });
    });
})