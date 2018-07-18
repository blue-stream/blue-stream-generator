import { GitService } from "./git/git.service";

export class Generator {
    static async generateTemplate(template: string, name: string, featureName: string) {
        await GitService.cloneBranch(`template-${template}`);
    }
}