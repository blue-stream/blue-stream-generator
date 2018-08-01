"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    rootDir: process.cwd(),
    git: {
        repo_url: 'https://gitlab+deploy-token-7655:w_dMsb15gXyiPDgJgiyo@gitlab.com/sapir-optimizations/blue-generator/microservice-template.git',
        credentials: {
            username: 'gitlab+deploy-token-7655',
            password: 'w_dMsb15gXyiPDgJgiyo'
        }
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