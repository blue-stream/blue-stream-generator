import * as fs from 'fs';
import { expect } from 'chai';
import { config } from './config';
import { remove } from 'fs-extra';
import { GitExecuter } from './git';

describe('GitService', () => {
    describe('#getTemplates()', () => {
        it('Should return array of templates', async () => {
            const templates: string[] = await GitExecuter.getBranchList();
            expect(templates).to.exist;
            expect(templates).to.be.an('array');
        });
    });

    describe('#cloneBranch()', () => {
        it('Should clone branch into work-space', async () => {
            const path = `${process.cwd()}/test_clone`;
            expect(fs.existsSync(path)).to.be.false;
            await GitExecuter.cloneSpecificBranch('template-root', path);
            expect(fs.existsSync(path)).to.be.true;
            await remove(path);
            expect(fs.existsSync(path)).to.be.false;
        });

        it('Should throw error when branch not exists', async () => {
            const path = `${process.cwd()}/test_clone`;
            let hasError = false;
            try {
                await GitExecuter.cloneSpecificBranch('unknown_branch', path);
            } catch (err) {
                hasError = true;
                expect(err).to.exist;
                expect(err).to.contain('Could not find remote branch');
            }

            expect(hasError).to.be.true;
        })
    });
})