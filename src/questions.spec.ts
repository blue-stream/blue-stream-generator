import { expect } from 'chai';
import { Questions } from './questions';

describe('Questions', () => {
    describe('#getQuestions()', () => {
        it('Should return array of questions', async () => {
            const questions = await Questions.getQuestions();
            expect(questions).exist;
            expect(questions).to.be.an('array');
            expect(questions).to.have.lengthOf(3);
        });
    })
});