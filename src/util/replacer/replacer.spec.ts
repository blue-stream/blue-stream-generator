import * as mock from 'mock-fs';
import * as fs from 'fs';
import { expect } from 'chai';
import { config } from '../../config';
import { ReplacerUtil } from './replacer';

describe('ReplacerUtil', () => {
    describe('#replaceFileNames()', () => {

        context('valid data', () => {
            before((done: MochaDone) => {
                mock({
                    [`${process.cwd()}/tests`]: {
                        [config.fileMapping['fileName']]: {
                            [`${config.fileMapping['fileName']}.router.ts`]: 'dummy content',
                            [`${config.fileMapping['fileName']}.controller.ts`]: 'dummy content',
                        }
                    }
                });

                done();
            });

            after((done: MochaDone) => {
                mock.restore();
                done();
            })

            it('Should rename all file and folder names', (done: MochaDone) => {
                const path = `${process.cwd()}/tests`;
                ReplacerUtil.replaceFileNames(path, 'test');
                const rootFile = fs.readdirSync(path);
                expect(rootFile[0]).to.be.equal('test');
                const files = fs.readdirSync(`${path}/test`);
                files.forEach((file: string) => {
                    expect(file).to.match(/test\.(router|controller)\.ts/);
                });

                done();
            });
        });

        context('invalid data', () => {
            it('Should throw error when path not exists', (done) => {
                let hasError = false;
                try {
                    ReplacerUtil.replaceFileNames(`${process.cwd()}/unknown_dir`, 'test');
                } catch (err) {
                    hasError = true;
                    expect(err).to.exist;
                    expect(err).to.match(/ENOENT/);
                }

                expect(hasError).to.be.true;
                done();
            });
        });
    });

    describe('#replaceFileContents()', () => {
        context('valid data', () => {
            before((done: MochaDone) => {
                mock({
                    [`${process.cwd()}/tests`]: {
                        'root_dir': {
                            'test.txt': 'FEATURE_NAME, featureName, FeatureName'
                        }
                    }
                });
                done();
            });

            after((done: MochaDone) => {
                mock.restore();
                done();
            });

            it('Should replace file content with desired content', (done: MochaDone) => {
                ReplacerUtil.replaceFileContents(`${process.cwd()}/tests`, 'test-user');
                const fileContent = fs.readFileSync(`${process.cwd()}/tests/root_dir/test.txt`, 'utf8');
                expect(fileContent).to.equal('test-user, testUser, TestUser');
                done();
            });
        });

        context('invalid data', () => {
            it('Should throw error when path not exists', (done: MochaDone) => {
                let hasError = false;
                try {
                    ReplacerUtil.replaceFileContents(`${process.cwd()}/unknown_dir`, 'test');
                } catch (err) {
                    hasError = true;
                    expect(err).to.exist;
                    expect(err).to.match(/ENOENT/);
                }

                expect(hasError).to.be.true;
                done();
            });
        });
    })
});