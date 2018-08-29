import { expect } from 'chai';
import { Questions } from './questions';
import { mockInquirer } from './util/inquirer-mock';

describe('Questions', () => {

    describe('#getProjectName()', function () {
        context('valid data', function () {
            let reset: Function;

            before(function (done: MochaDone) {
                reset = mockInquirer({
                    'project-name': 'test-proj'
                });
                done();
            });

            after(function (done: MochaDone) {
                reset();
                done();
            })

            it('Should return generated project name', async function () {
                const name = await Questions.getProjectName();
                expect(name).to.equal('test-proj');
            });
        });

        context('invalid data', function () {
            it('Should throw error when project name contains invalid characters', async function () {
                let hasThrown = false;

                let reset = mockInquirer({
                    'project-name': 'test proj'
                });

                try {
                    await Questions.getProjectName();
                } catch (err) {
                    hasThrown = true;
                    expect(err).to.exist;
                    expect(err).to.have.property('message', 'Validation failed for field project-name')
                } finally {
                    reset();
                    expect(hasThrown).to.be.true;
                }
            })
        });
    });

    describe('#getMainFeatureName()', function () {
        context('valid data', function () {
            let reset: Function;

            before(function (done: MochaDone) {
                reset = mockInquirer({
                    'main-feature': 'test-feat'
                });
                done();
            });

            after(function (done: MochaDone) {
                reset();
                done();
            })

            it('Should return main feature', async function () {
                const name = await Questions.getMainFeatureName();
                expect(name).to.equal('test-feat');
            });
        });

        context('invalid data', function () {
            it('Should throw error when main feature name contains invalid characters', async function () {
                let hasThrown = false;

                let reset = mockInquirer({
                    'main-feature': 'test feat'
                });

                try {
                    await Questions.getMainFeatureName();
                } catch (err) {
                    hasThrown = true;
                    expect(err).to.exist;
                    expect(err).to.have.property('message', 'Validation failed for field main-feature')
                } finally {
                    reset();
                    expect(hasThrown).to.be.true;
                }
            })
        });
    });
});