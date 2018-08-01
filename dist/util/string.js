"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtil {
    /**
     * Converts a string to camelCase string
     * @param input String to convert
     * @returns camelCase transformation of the string
     * @example
     * toCamelCase('hello world') // helloWorld
     * toCamelCase('TYPE-SCRIPT') // typeScript
     */
    static toCamelCase(input) {
        // Replace special characters with a space
        input = input.replace(/[^a-zA-Z0-9 ]/g, " ");
        // put a space before an uppercase letter
        input = input.replace(/([a-z](?=[A-Z]))/g, '$1 ');
        // Lower case first character and some other stuff that I don't understand
        input = input.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
        // uppercase characters preceded by a space or number
        input = input.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
            return b.trim() + c.toUpperCase();
        });
        return input;
    }
    ;
    /**
     * Converts a string to PascalCase (UpperCamelCase) string
     * @param input String to convert
     * @returns PascalCase transformation of the string
     * @example
     * toPascalCase('hello world') // HelloWorld
     * toPascalCase('TYPE-SCRIPT') // TypeScript
     */
    static toPascalCase(input) {
        input = StringUtil.toCamelCase(input);
        return `${input[0].toUpperCase()}${input.substr(1, input.length)}`;
    }
    ;
}
exports.StringUtil = StringUtil;
//# sourceMappingURL=string.js.map