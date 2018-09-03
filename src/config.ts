type Configuration = {
    rootDir: string;
    git: {
        repo_url: string;
    };
    fileMapping: {
        [index: string]: string;
    };
    ignoreFiles: string[];
    ignoreDirectories: string[];
}

export const config: Configuration = {
    rootDir: process.cwd(),
    git: {
        repo_url: 'https://github.com/blue-stream/blue-stream-template',
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