module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
    testMatch: ["**/src/tests/**/*.(test|spec).(ts|tsx)"], // Make sure Jest finds your tests
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
};
