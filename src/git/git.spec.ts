import * as fs from 'fs';
import { expect } from 'chai';
import { config } from '../config';
import { remove } from 'fs-extra';
import { GitExecuter } from './git';

describe('GitService', () => {

    describe('#cloneBranch()', () => {
        it('Should clone branch into work-space', async () => {
            const path = `${process.cwd()}/test_clone`;
            await GitExecuter.cloneSpecificBranch('master', path);
            expect(fs.existsSync(path)).to.be.true;
            await remove(path);
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

    describe('#getBranchList', () => {
        it('Should get branch list', async() => {
            const branches = await GitExecuter.getBranchList(config.git.repo_url);

            expect(branches).to.exist;
            expect(branches).to.be.an('array');
            expect(branches).to.contain('master');
        });
    })
})