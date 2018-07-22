import * as uniqid from 'uniqid';

export const config = {
    rootDir: process.cwd(),
    generatorId: uniqid(),
    git: {
        repo_url: 'https://gitlab.com/sapir-optimizations/blue-generator/microservice-template.git',
        credentials: {
            username: 'gitlab+deploy-token-7655',
            password: 'w_dMsb15gXyiPDgJgiyo'
        }
    }
}