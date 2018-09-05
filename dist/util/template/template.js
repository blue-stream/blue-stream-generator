"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const config_1 = require("../../config");
class Template {
    static fetchFeatures(path, features = []) {
        const files = fs.readdirSync(`${path}`);
        files.forEach((file) => {
            const stats = fs.statSync(`${path}/${file}`);
            if (stats.isFile()) {
                const fileContent = fs.readFileSync(`${path}/${file}`, 'utf8');
                const featuresRegex = new RegExp(/(?<=\/\/\s<)[^/>]+(?=>)/, 'g');
                const matchedFeatures = fileContent.match(featuresRegex);
                if (matchedFeatures) {
                    matchedFeatures.forEach(feature => features.push(feature));
                }
            }
            else if (stats.isDirectory()) {
                Template.fetchFeatures(`${path}/${file}`, features);
            }
        });
        // remove duplicates and return
        return [...new Set(features)];
    }
    static getFeatureRegex(feature) {
        const featurePattern = `\\/\\/\\s*<${feature}>\\s?([\\s\\S]*?)\\/\\/\\s*<\\/${feature}>\\s*\\r?\\n?`;
        return new RegExp(featurePattern, 'mg');
    }
    static getInvertedFeatureRegex(feature) {
        const invertedFeaturePattern = `\\/\\/\\s*!<${feature}>\\s?([\\s\\S]*?)\\/\\/\\s*!<\\/${feature}>\\s*\\r?\\n?`;
        return new RegExp(invertedFeaturePattern, 'mg');
    }
    static applyFeatures(path, featuresToDisable, allFeatures) {
        const files = fs.readdirSync(path);
        files.forEach(file => {
            if (config_1.config.ignoreDirectories.indexOf(file) === -1) {
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
                        }
                        else {
                            fs.unlinkSync(`${path}/${file}`);
                        }
                    }
                }
                else if (stats.isDirectory()) {
                    Template.applyFeatures(`${path}/${file}`, featuresToDisable, allFeatures);
                }
            }
        });
    }
}
exports.Template = Template;
//# sourceMappingURL=template.js.map