import { exec, execFile, ChildProcess } from 'child_process';
import { config } from '../config';
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

    /**
     * Get a list of branches from remote repository
     * git ls-remote {remote}
     * @param remote {string} Remote repository url
     */
    static async getBranchList(remote: string): Promise<string[]> {
        const result = await GitExecuter.asyncExec(`git ls-remote ${remote}`);
        const branches = result.match(/(?<=refs\/heads\/).*/g);

        return branches ? branches.map(branch => branch.toString()) : [];
    }
}