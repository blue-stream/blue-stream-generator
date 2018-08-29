import * as fs from 'fs';
import { config } from '../config';

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


    private static getFeatureRegex(feature: string): RegExp {
        const featurePattern = `\\/\\/\\s*<${feature}>([\\s\\S]*?)\\/\\/\\s*<\\/${feature}>`;
        return new RegExp(featurePattern, 'mg');
    }

    private static getInvertedFeatureRegex(feature: string): RegExp {
        const invertedFeaturePattern = `\\/\\/\\s*!<${feature}>([\\s\\S]*?)\\/\\/\\s*!<\\/${feature}>`;
        return new RegExp(invertedFeaturePattern, 'mg');
    }

    static applyFeatures(path: string, featuresToDisable: string[], allFeatures: string[]) {
        const files: string[] = fs.readdirSync(path);
        files.forEach(file => {
            if (config.ignoreDirectories.indexOf(file) === -1) {
                const stats = fs.statSync(`${path}/${file}`);
                if (stats.isFile()) {
                    const fileContent = fs.readFileSync(`${path}/${file}`, 'utf8');
                    let modifiedContent = fileContent;
                    allFeatures.forEach(feature => {
                        const shouldRemove = featuresToDisable.includes(feature);
                        const removeRegex = shouldRemove ?
                            Template.getFeatureRegex(feature) :
                            Template.getInvertedFeatureRegex(feature);

                        const unwrapRegex = shouldRemove ?
                            Template.getInvertedFeatureRegex(feature) :
                            Template.getFeatureRegex(feature);

                        modifiedContent = modifiedContent.replace(removeRegex, '');
                        modifiedContent = modifiedContent.replace(unwrapRegex, '$1');
                        const removeSuffixPattern = `_REMOVE\\/\\*${feature}\\*\\/`;
                        modifiedContent = modifiedContent.replace(new RegExp(removeSuffixPattern, 'mg'), '');
                    });
                    if (modifiedContent !== fileContent) {
                        if (modifiedContent.trim()) {
                            fs.writeFileSync(`${path}/${file}`, modifiedContent, 'utf8');
                        } else {
                            fs.unlinkSync(`${path}/${file}`);
                        }
                    }
                } else if (stats.isDirectory()) {
                    Template.applyFeatures(`${path}/${file}`, featuresToDisable, allFeatures);
                }
            }
        });
    }
}