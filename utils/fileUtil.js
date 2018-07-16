const fs = require('fs');

const CURRENT_DIR = process.cwd();

module.exports = {
    createDirectoryContents: function (templatePath, newProjectPath, mainFeatureName) {
        const filesToCreate = fs.readdirSync(templatePath);

        filesToCreate.forEach(file => {
            const originalFilePath = `${templatePath}/${file}`;

            // get stats about the current file
            const stats = fs.statSync(originalFilePath);

            if (stats.isFile()) {
                let fileContent = fs.readFileSync(originalFilePath, 'utf8');

                fileContent = fileContent.replace(/featureName/g, mainFeatureName.toLowerCase());
                fileContent = fileContent.replace(/FeatureName/g, capitalizeFirstLetter(mainFeatureName));
                fileContent = fileContent.replace(/FEATURE_NAME/g, mainFeatureName.toLowerCase());

                file = file.replace(/FEATURE_NAME/g, mainFeatureName.toLowerCase());

                const writePath = `${CURRENT_DIR}/${newProjectPath}/${file}`;
                fs.writeFileSync(writePath, fileContent, 'utf8');
            } else if (stats.isDirectory()) {
                const dirName = file.replace(/FEATURE_NAME/g, mainFeatureName.toLowerCase());
                fs.mkdirSync(`${CURRENT_DIR}/${newProjectPath}/${dirName}`);

                // recursive call
                this.createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${dirName}`, mainFeatureName);
            }
        });
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}