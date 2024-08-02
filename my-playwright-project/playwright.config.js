require('dotenv').config();

const { devices, defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    retries: 1,
    reporter: [
        ['list'], 
        ['html', { outputFolder: 'playwright-report', open: 'never' }],

    ],
    projects: [
        {
            name: process.env.BROWSER,
            use: { browserName: process.env.BROWSER },
        },
    ],
    use: {
        baseURL: process.env.BASE_URL,
    },
});