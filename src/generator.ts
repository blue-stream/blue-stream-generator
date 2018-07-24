import { config } from './config';
import { GitService } from './git.service';
import { ReplacerUtil } from './util/replacer';

export class Generator {
    /**
     * Generate project template from specific template name
     * @param template Template name
     * @param name Project name
     * @param featureName Main feature name
     * @example
     * generateTemplate('with-db', 'users-microservice', 'user')
     * // Will generate a project from the templates repository in the following structure
     * // users-microservice/
     * //  |___ src/
     * //       |___ users/
     * //       |      |_________ users.controller.ts
     * //       |      |_________ users.router.ts
     * //       |      :
     * //       |      |_________ users.interface.ts
     * //       |___ config.ts
     * //       |___ index.ts
     * //       :
     * //       |___ server.ts
     */
    static async generateTemplate(template: string, name: string, featureName: string) {
        await GitService.cloneBranch(`template-${template}`, `${config.rootDir}/${name}`);
        ReplacerUtil.replaceFileNames(`${config.rootDir}/${name}`, featureName);
        ReplacerUtil.replaceFileContents(`${config.rootDir}/${name}`, featureName);
    }
}