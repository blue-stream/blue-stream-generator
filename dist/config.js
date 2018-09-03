"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    rootDir: process.cwd(),
    git: {
        repo_url: 'https://github.com/blue-stream/blue-stream-template',
    },
    fileMapping: {
        fileName: 'FEATURE_NAME',
        camelCase: 'featureName',
        PascalCase: 'FeatureName'
    },
    ignoreFiles: [],
    ignoreDirectories: [
        '.git',
        'node_modules'
    ]
};
//# sourceMappingURL=config.js.map