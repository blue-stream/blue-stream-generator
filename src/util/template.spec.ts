import * as mock from 'mock-fs';
import { config } from '../config';
import { expect } from 'chai';
import { Template } from './template';
import * as fs from 'fs';

describe('Template', function () {
    before(function (done: MochaDone) {
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

    after(function (done: MochaDone) {
        mock.restore();
        done();
    })

    describe('#fetchFeatures()', function () {
        it('Should return an array of features', function (done: MochaDone) {
            const features = Template.fetchFeatures(`${process.cwd()}/tests`);
            expect(features).to.exist;
            expect(features).to.be.an('array');
            expect(features).to.have.lengthOf(2);
            expect(features).to.have.members(['Test', 'Feature']);

            done();
        });

        it('Should return an empty array when not features found', function (done: MochaDone) {
            const features = Template.fetchFeatures(`${process.cwd()}/tests/dirWithoutFeatures`);
            expect(features).to.exist;
            expect(features).to.be.an('array');
            expect(features).to.have.lengthOf(0);

            done();
        });
    });

    describe('#applyFeatures()', function () {
        it('Should apply selected features to the files', function (done: MochaDone) {
            Template.applyFeatures(`${process.cwd()}/tests`, ['Test'], ['Test', 'Feature']);

            const fileContent = fs.readFileSync(`${process.cwd()}/tests/dirWithFeatures/FileWithFeature.ts`, 'utf8');
            expect(fileContent).to.not.match(/console\.log\('delete'\)/mg);

            done();
        });

        it('Should remove files that are empty', function (done: MochaDone) {
            Template.applyFeatures(`${process.cwd()}/tests`, ['Test'], ['Test', 'Feature']);

            expect(fs.existsSync(`${process.cwd()}/tests/dirWithFeatures/FileWithFeaturesToRemove.ts`)).to.be.false;

            done();
        });

        it('Should apply !<feature> when feature is disabled', function(done:MochaDone) {
            Template.applyFeatures(`${process.cwd()}/tests`, [], ['Test', 'Feature']);

            const fileContent = fs.readFileSync(`${process.cwd()}/tests/dirWithFeatures/FileWithFeature.ts`, 'utf8');
            expect(fileContent).to.not.match(/console\.log\('hello'\)/mg);

            done();
        })
    })
})