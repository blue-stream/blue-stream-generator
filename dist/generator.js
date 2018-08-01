"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const replacer_1 = require("./util/replacer");
const git_1 = require("./git");
class Generator {
    /**
     * Generate project template from specific template name
     * @param template Template name
     * @param name Project name
     * @param featureName Main feature name
     * @example
     * generateTemplate('with-db', 'users-microservice', 'user')
     * // Will generate a project from the templates repository in the following structure
     * // users-microservice/
     * //  |___ src/
     * //       |___ users/
     * //       |      |_________ users.controller.ts
     * //       |      |_________ users.router.ts
     * //       |      :
     * //       |      |_________ users.interface.ts
     * //       |___ config.ts
     * //       |___ index.ts
     * //       :
     * //       |___ server.ts
     */
    static generateTemplate(template, name, featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield git_1.GitExecuter.cloneSpecificBranch(`template-${template}`, `${config_1.config.rootDir}/${name}`);
            replacer_1.ReplacerUtil.replaceFileNames(`${config_1.config.rootDir}/${name}`, featureName);
            replacer_1.ReplacerUtil.replaceFileContents(`${config_1.config.rootDir}/${name}`, featureName);
        });
    }
}
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map