/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// https://stackoverflow.com/questions/59879689/jest-syntaxerror-cannot-use-import-statement-outside-a-module
module.exports = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
}
