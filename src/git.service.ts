import * as Git from 'nodegit';
import { config } from './config';
import { remove } from 'fs-extra';

export class GitService {

    /**
     * Fetch templates from git repository
     * All templates are git branches with prefix "template-"
     * @returns Promise of string array containing template names
     * @example 
     * //Returns 
     * ['main', 'with-db', 'with-ci']
     */
    static async getTemplates(): Promise<string[]> {
        const repoTempPath = `${config.rootDir}/repo-${config.generatorId}`;

        const localRepository = await Git.Repository.init(repoTempPath, 1);
        const remoteRepository = await Git.Remote.create(localRepository, 'origin', config.git.repo_url);

        await remoteRepository.connect(Git.Enums.DIRECTION.FETCH, {
            credentials() {
                return Git.Cred
                    .userpassPlaintextNew(
                        config.git.credentials.username,
                        config.git.credentials.password
                    );
            }
        });

        const references = await remoteRepository.referenceList();

        const templates: string[] = references
            .filter((branch: Git.Reference) => {
                return /.*\/?refs\/heads\/template-/.test(branch.name());
            })
            .map((branch: Git.Reference) => {
                return branch.name().replace(/.*\/?refs\/heads\/template-/, '');
            });

        await remove(repoTempPath);

        return templates;
    }

    /**
     * Clone a specific branch to workspace.
     * @param branch {string} Branch to clone
     * @param destinationPath {string} Path to clone repository 
     * @returns Promise of the created Repository
     */
    static async cloneBranch(branch: string, destinationPath: string) {
        return Git.Clone.clone(config.git.repo_url, destinationPath, {
            checkoutBranch: branch,
            fetchOpts: {
                callbacks: {
                    credentials: () => {
                        return Git.Cred
                            .userpassPlaintextNew(
                                config.git.credentials.username,
                                config.git.credentials.password
                            );
                    }
                }
            }
        });
    }
}
