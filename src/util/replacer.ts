import * as fs from 'fs';
import { renameSync } from 'fs-extra';
import { config } from '../config';
import { StringUtil } from './string';

export class ReplacerUtil {

    /**
     * Rename file and folder names in desired path according to configuration fileMapping
     * @param path Directory path to replace
     * @param name desired name
     * @example
     * // For the following structure
     * // src
     * //  |___ FEATURE_NAME
     * //  |      |_________ FEATURE_NAME.controller.ts
     * //  |      |_________ FEATURE_NAME.router.ts
     * //  |      |_________ FEATURE_NAME.interface.ts
     * //  |___ config.ts
     * //  |___ index.ts
     * //  :
     * //  |___ server.ts
     * replaceFileNames(...src, 'users')
     * // Will rename files to the following structure
     * // src
     * //  |___ users
     * //  |      |_________ users.controller.ts
     * //  |      |_________ users.router.ts
     * //  |      |_________ users.interface.ts
     * //  |___ config.ts
     * //  |___ index.ts
     * //  :
     * //  |___ server.ts
     */
    static replaceFileNames(path: string, name: string) {
        const files: string[] = fs.readdirSync(path);
        files.forEach((file: string) => {
            const fileNameRegex = new RegExp(config.fileMapping.fileName, 'ig');
            let fileName = file;
            if (fileNameRegex.test(file)) {
                fileName = file.replace(fileNameRegex, name.toLowerCase());
                renameSync(`${path}/${file}`, `${path}/${fileName}`);
            }

            const stats = fs.statSync(`${path}/${fileName}`);

            if (stats.isDirectory()) {
                this.replaceFileNames(`${path}/${fileName}`, name);
            }
        });
    }

    /**
     * Replace files content in desired path according to configuration fileMapping
     * @param path Directory path to replace
     * @param content String content to be replaced with
     * @example
     * // For example directory src/users has file named users.interface.ts
     * export interface IFeatureName {
     *      ...
     * }
     * 
     * replaceFileContents(...src/users, 'user')
     * // Will replace interface name to the following
     * export interface IUser {
     *      ...
     * }
     */
    static replaceFileContents(path: string, content: string) {
        const files: string[] = fs.readdirSync(path);
        const camelCaseRegex = new RegExp(config.fileMapping.camelCase, 'g');
        const pascalCaseRegex = new RegExp(config.fileMapping.PascalCase, 'g');
        const fileNameRegex = new RegExp(config.fileMapping.fileName, 'ig');
        files.forEach((file: string) => {
            const stats = fs.statSync(`${path}/${file}`);
            if (stats.isFile() && config.ignoreFiles.indexOf(file) === -1) {
                let fileContent = fs.readFileSync(`${path}/${file}`, 'utf8');

                fileContent = fileContent.replace(camelCaseRegex, StringUtil.toCamelCase(content));
                fileContent = fileContent.replace(pascalCaseRegex, StringUtil.toPascalCase(content));
                fileContent = fileContent.replace(fileNameRegex, content.toLowerCase());

                fs.writeFileSync(`${path}/${file}`, fileContent, 'utf8');
            } else if (stats.isDirectory() && config.ignoreDirectories.indexOf(file) === -1) {
                ReplacerUtil.replaceFileContents(`${path}/${file}`, content);
            }
        });
    }
}