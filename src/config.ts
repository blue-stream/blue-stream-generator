import * as uniqid from 'uniqid';

type Configuration = {
    rootDir: string;
    generatorId: string;
    git: {
        repo_url: string;
        credentials: {
            username: string;
            password: string;
        }
    };
    fileMapping: {
        [index: string]: string;
    };
    ignoreFiles: string[];
    ignoreDirectories: string[];
}

export const config: Configuration = {
    rootDir: process.cwd(),
    generatorId: uniqid(),
    git: {
        repo_url: 'https://gitlab.com/sapir-optimizations/blue-generator/microservice-template.git',
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
    ignoreFiles: [

    ],
    ignoreDirectories: [
        '.git',
        'node_modules'
    ]
}