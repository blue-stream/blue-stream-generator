import { config } from '../config';
import * as Git from 'nodegit';
import * as rimraf from 'rimraf';
import { FileUtil } from '../utils/file';

const CURRENT_DIR = process.cwd();

const cloneOptions: Git.CloneOptions = {
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
}

export class GitService {
    private static repository: Git.Repository;

    static async initializeRepository() {
        this.repository = await Git.Clone.clone(config.git.repo_url, `${CURRENT_DIR}/tmp`, cloneOptions);
    }

    static async getTemplateBranchNames() {
        if (!this.repository) {
            await this.initializeRepository();
        }

        const branches: string[] = await this.repository.getReferenceNames(Git.Reference.TYPE.LISTALL);
        return branches
            .filter((branch: string) => /\/origin\/template-/.test(branch))
            .map((branch: string) => {
                return branch.replace(/(.)+\/origin\/template-/, '');
            });
    }

    static async getTemplates() {
        const localRepository = await Git.Repository.init(config.temporaryDirectoryPath, 1);
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
            
        FileUtil.deleteDirectoryRecursive(config.temporaryDirectoryPath);

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
