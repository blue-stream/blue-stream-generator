import { copy, remove } from 'fs-extra';
import { config } from './config';
import { GitService } from './git/git.service';

export class Generator {
    /**
     * Generate project template from specific template name
     * @param template Template name
     * @param name Project name
     * @param featureName Main feature name
     */
    static async generateTemplate(template: string, name: string, featureName: string) {
        const cloneTempPath = `${config.rootDir}/clone-${config.generatorId}/`;

        await GitService.cloneBranch(`template-${template}`, cloneTempPath);

        await copy(cloneTempPath, `${config.rootDir}/${name}`);
        await remove(cloneTempPath);
    }
}