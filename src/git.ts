import { exec, execFile, ChildProcess } from 'child_process';
import { config } from './config';
import { mkdirpSync } from 'fs-extra';
import * as fs from 'fs';

export class GitExecuter {

    private static asyncExec(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, (error: Error | null, stdout: string, stderr: string) => {
                if (error) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            })
        });
    }

     /**
     * Fetch templates from git repository
     * All templates are git branches with prefix "template-"
     * @returns Promise of string array containing template names
     * @example 
     * //Returns 
     * ['main', 'with-db', 'with-ci']
     */
    static async getBranchList(): Promise<string[]> {
        let result = await GitExecuter.asyncExec(`git ls-remote ${config.git.repo_url}`);
        let branches: RegExpMatchArray | null = result.match(/refs\/.+/g);

        if (branches) {
            branches = branches.filter(branch => branch.includes('template-'))
                .map(branch => branch.replace(/.+template-/, ''));

            return branches;
        }

        return [];
    }

    /**
     * Clone a specific branch to workspace.
     * @param branch {string} Branch to clone
     * @param destinationPath {string} Path to clone repository 
     */
    static async cloneSpecificBranch(branch: string, destinationPath: string): Promise<void> {
        if (!fs.existsSync(destinationPath)) {
            mkdirpSync(destinationPath);
        }

        await GitExecuter.asyncExec(`git clone --single-branch -b ${branch} ${config.git.repo_url} ${destinationPath}/.`);
    }
}