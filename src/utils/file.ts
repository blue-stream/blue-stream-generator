import * as fs from 'fs';
import { StringUtil } from './string';

const CURRENT_DIR = process.cwd();

export class FileUtil {

    /**
     * Copy directory and its contents
     * @param sourcePath Source directory path
     * @param destinationPath Destination path
     */
    static copyDirectoryContent(sourcePath: string, destinationPath: string) {
        const directoryContent: string[] = fs.readdirSync(sourcePath);

        directoryContent.forEach((file: string) => {
            const filePath = `${sourcePath}/${file}`;
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                const fileContent: string = fs.readFileSync(filePath, 'utf8');
                const writePath = `${CURRENT_DIR}/${destinationPath}/${file}`;
                fs.writeFileSync(writePath, fileContent, 'utf8');
            } else if (stats.isDirectory()) {
                fs.mkdirSync(`${CURRENT_DIR}/${destinationPath}/${file}`);
                this.copyDirectoryContent(`${sourcePath}/${file}`, `${destinationPath}/${file}`);
            }
        });
    }

    static createDirectoryContents(templatePath: string, projectPath: string, mainFeatureName: string) {
        const filesToCreate: string[] = fs.readdirSync(templatePath);

        filesToCreate.forEach((file: string) => {
            const originalFilePath = `${templatePath}/${file}`;

            const stats = fs.statSync(originalFilePath);

            if (stats.isFile()) {
                let fileContent: string = fs.readFileSync(originalFilePath, 'utf8');

                fileContent = fileContent.replace(/featureName/g, mainFeatureName.toLowerCase());
                fileContent = fileContent.replace(/FeatureName/g, StringUtil.capitalizeFirstLetter(mainFeatureName));
                fileContent = fileContent.replace(/FEATURE_NAME/g, mainFeatureName.toLowerCase());

                file = file.replace(/FEATURE_NAME/g, mainFeatureName.toLowerCase());
                const writePath = `${CURRENT_DIR}/${projectPath}/${file}`;

                fs.writeFileSync(writePath, fileContent, 'utf8');
            } else if (stats.isDirectory()) {
                const dirName = file.replace(/FEATURE_NAME/g, mainFeatureName.toLowerCase());
                fs.mkdirSync(`${CURRENT_DIR}/${projectPath}/${dirName}`);

                this.createDirectoryContents(`${templatePath}/${file}`, `${projectPath}/${dirName}`, mainFeatureName);
            }
        })
    }

    static deleteDirectoryRecursive(path: string) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file: string, index: number) => {
                const currentPath = `${path}/${file}`;
                if (fs.lstatSync(currentPath).isDirectory()) {
                    FileUtil.deleteDirectoryRecursive(currentPath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });

            fs.rmdirSync(path);
        }
    }
}