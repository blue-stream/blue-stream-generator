import * as fs from 'fs';
import { expect } from 'chai';
import { GitService } from './git.service';
import { config } from './config';
import { remove } from 'fs-extra';

describe('GitService', () => {
    describe('#getTemplates()', () => {
        it('Should return array of templates', async () => {
            const templates: string[] = await GitService.getTemplates();
            expect(templates).to.exist;
            expect(templates).to.be.an('array');
        });

        it('Should remove temporary folder created for template fetching', async () => {
            const repoTempPath = `${config.rootDir}/repo-${config.generatorId}`;
            await GitService.getTemplates();
            expect(fs.existsSync(repoTempPath)).to.be.false;
        });
    });

    describe('#cloneBranch()', () => {
        it('Should clone branch into work-space', async () => {
            const path = `${process.cwd()}/test_clone`;
            expect(fs.existsSync(path)).to.be.false;
            await GitService.cloneBranch('template-root', path);
            expect(fs.existsSync(path)).to.be.true;
            await remove(path);
            expect(fs.existsSync(path)).to.be.false;
        });

        it('Should throw error when branch not exists', async () => {
            const path = `${process.cwd()}/test_clone`;
            let hasError = false;
            try {
                await GitService.cloneBranch('unknown_branch', path);
            } catch (err) {
                hasError = true;
                expect(err).to.exist;
                expect(err).to.match(/reference.+not found/);
            }

            expect(hasError).to.be.true;
        })
    });
})