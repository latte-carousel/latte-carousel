module.exports = {
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.json",
        },
    },

    moduleFileExtensions: ["ts", "tsx", "js"],

    testMatch: ["<rootDir>/test/**/*.test.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },

    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/node_modules/**"],
    coverageReporters: ["text", "text-summary"],

    clearMocks: true,
};
