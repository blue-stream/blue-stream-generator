"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock = require("mock-fs");
const chai_1 = require("chai");
const template_1 = require("./template");
const fs = require("fs");
describe('Template', function () {
    before(function (done) {
        mock({
            [`${process.cwd()}/tests`]: {
                'dirWithFeatures': {
                    'FileWithFeature.ts': `
                        // <Test>
                            console.log('delete');
                        // </Test>
                        export class Test {
                            // <Feature>
                                if(true) return '<false>';
                            // </Feature>
                            // !<Feature>
                                console.log('hello');
                            // !</Feature>
                        }
                    `,
                    'FileWithFeaturesToRemove.ts': `
                        // <Test>
                            console.log('delete');
                        // </Test>
                    `
                },
                'dirWithoutFeatures': {
                    'FileWithoutFeatures.ts': `
                        export class JustARegularClass {
                            ...
                        }
                    `
                }
            }
        });
        done();
    });
    after(function (done) {
        mock.restore();
        done();
    });
    describe('#fetchFeatures()', function () {
        it('Should return an array of features', function (done) {
            const features = template_1.Template.fetchFeatures(`${process.cwd()}/tests`);
            chai_1.expect(features).to.exist;
            chai_1.expect(features).to.be.an('array');
            chai_1.expect(features).to.have.lengthOf(2);
            chai_1.expect(features).to.have.members(['Test', 'Feature']);
            done();
        });
        it('Should return an empty array when not features found', function (done) {
            const features = template_1.Template.fetchFeatures(`${process.cwd()}/tests/dirWithoutFeatures`);
            chai_1.expect(features).to.exist;
            chai_1.expect(features).to.be.an('array');
            chai_1.expect(features).to.have.lengthOf(0);
            done();
        });
    });
    describe('#applyFeatures()', function () {
        it('Should apply selected features to the files', function (done) {
            template_1.Template.applyFeatures(`${process.cwd()}/tests`, ['Test'], ['Test', 'Feature']);
            const fileContent = fs.readFileSync(`${process.cwd()}/tests/dirWithFeatures/FileWithFeature.ts`, 'utf8');
            chai_1.expect(fileContent).to.not.match(/console\.log\('delete'\)/mg);
            done();
        });
        it('Should remove files that are empty', function (done) {
            template_1.Template.applyFeatures(`${process.cwd()}/tests`, ['Test'], ['Test', 'Feature']);
            chai_1.expect(fs.existsSync(`${process.cwd()}/tests/dirWithFeatures/FileWithFeaturesToRemove.ts`)).to.be.false;
            done();
        });
        it('Should apply !<feature> when feature is disabled', function (done) {
            template_1.Template.applyFeatures(`${process.cwd()}/tests`, [], ['Test', 'Feature']);
            const fileContent = fs.readFileSync(`${process.cwd()}/tests/dirWithFeatures/FileWithFeature.ts`, 'utf8');
            chai_1.expect(fileContent).to.not.match(/console\.log\('hello'\)/mg);
            done();
        });
    });
});
//# sourceMappingURL=template.spec.js.map