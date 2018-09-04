"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock = require("mock-fs");
const fs = require("fs");
const chai_1 = require("chai");
const config_1 = require("../../config");
const replacer_1 = require("./replacer");
describe('ReplacerUtil', () => {
    describe('#replaceFileNames()', () => {
        context('valid data', () => {
            before((done) => {
                mock({
                    [`${process.cwd()}/tests`]: {
                        [config_1.config.fileMapping['fileName']]: {
                            [`${config_1.config.fileMapping['fileName']}.router.ts`]: 'dummy content',
                            [`${config_1.config.fileMapping['fileName']}.controller.ts`]: 'dummy content',
                        }
                    }
                });
                done();
            });
            after((done) => {
                mock.restore();
                done();
            });
            it('Should rename all file and folder names', (done) => {
                const path = `${process.cwd()}/tests`;
                replacer_1.ReplacerUtil.replaceFileNames(path, 'test');
                const rootFile = fs.readdirSync(path);
                chai_1.expect(rootFile[0]).to.be.equal('test');
                const files = fs.readdirSync(`${path}/test`);
                files.forEach((file) => {
                    chai_1.expect(file).to.match(/test\.(router|controller)\.ts/);
                });
                done();
            });
        });
        context('invalid data', () => {
            it('Should throw error when path not exists', (done) => {
                let hasError = false;
                try {
                    replacer_1.ReplacerUtil.replaceFileNames(`${process.cwd()}/unknown_dir`, 'test');
                }
                catch (err) {
                    hasError = true;
                    chai_1.expect(err).to.exist;
                    chai_1.expect(err).to.match(/ENOENT/);
                }
                chai_1.expect(hasError).to.be.true;
                done();
            });
        });
    });
    describe('#replaceFileContents()', () => {
        context('valid data', () => {
            before((done) => {
                mock({
                    [`${process.cwd()}/tests`]: {
                        'root_dir': {
                            'test.txt': 'FEATURE_NAME, featureName, FeatureName'
                        }
                    }
                });
                done();
            });
            after((done) => {
                mock.restore();
                done();
            });
            it('Should replace file content with desired content', (done) => {
                replacer_1.ReplacerUtil.replaceFileContents(`${process.cwd()}/tests`, 'test-user');
                const fileContent = fs.readFileSync(`${process.cwd()}/tests/root_dir/test.txt`, 'utf8');
                chai_1.expect(fileContent).to.equal('test-user, testUser, TestUser');
                done();
            });
        });
        context('invalid data', () => {
            it('Should throw error when path not exists', (done) => {
                let hasError = false;
                try {
                    replacer_1.ReplacerUtil.replaceFileContents(`${process.cwd()}/unknown_dir`, 'test');
                }
                catch (err) {
                    hasError = true;
                    chai_1.expect(err).to.exist;
                    chai_1.expect(err).to.match(/ENOENT/);
                }
                chai_1.expect(hasError).to.be.true;
                done();
            });
        });
    });
});
//# sourceMappingURL=replacer.spec.js.map