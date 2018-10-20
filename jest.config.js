module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
        },
    },

    moduleFileExtensions: ["ts", "tsx", "js"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
    },

    testMatch: ["<rootDir>/test/**/*.test.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },

    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/node_modules/**"],
    coverageReporters: ["text", "text-summary"],
};
