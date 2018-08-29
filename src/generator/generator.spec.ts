import { expect } from 'chai';
import * as fs from 'fs';
import { Generator } from './generator';
import { remove } from 'fs-extra';

describe('Generator', () => {
    describe('#generateTemplate()', () => {
        it('Should generate template', async () => {
            const path = `${process.cwd()}/generator`;
            expect(fs.existsSync(path)).to.be.false;
            await Generator.generateTemplate('generator', 'feat');
            expect(fs.existsSync(path)).to.be.true;
            await remove(path);
            expect(fs.existsSync(path)).to.be.false;
        });
    })
});