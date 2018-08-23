import * as fs from 'fs';

export class Template {
    static fetchFeatures(path: string, features: string[] = []) {
        const files: string[] = fs.readdirSync(`${path}`);
        files.forEach((file: string) => {
            const stats = fs.statSync(`${path}/${file}`);

            if (stats.isFile()) {
                const fileContent = fs.readFileSync(`${path}/${file}`, 'utf8');
                const featuresRegex = new RegExp(/(?<=\/\/\s<)[^/>]+(?=>)/, 'g');
                const matchedFeatures = fileContent.match(featuresRegex);
                if (matchedFeatures) {
                    matchedFeatures.forEach(feature => features.push(feature));
                }
            } else if (stats.isDirectory()) {
                Template.fetchFeatures(`${path}/${file}`, features);
            }
        });

        // remove duplicates and return
        return [...new Set(features)];
    }

    static removeFeature(path: string, feature: string) {
        const files: string[] = fs.readdirSync(`${path}`);
        files.forEach((file: string) => {
            const stats = fs.statSync(`${path}/${file}`);
            if (file !== '.git') {
                if (stats.isFile()) {
                    const fileContent = fs.readFileSync(`${path}/${file}`, 'utf8');
                    const regexPattern = `\\/\\/\\s*<${feature}>([\\s\\S]*?)\\/\\/\\s*<\\/${feature}>`;
                    const removeRegex = new RegExp(regexPattern, 'mg');
                    console.log(removeRegex)
                    const replacedFile = fileContent.replace(removeRegex, '');
                    if (replacedFile != fileContent) {
                        console.log(replacedFile);
                        fs.writeFileSync(`${path}/${file}`, replacedFile, 'utf8');
                    }
                } else if (stats.isDirectory()) {
                    Template.removeFeature(`${path}/${file}`, feature);
                }
            }
        });

    }
}