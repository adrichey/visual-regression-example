import puppeteer from 'puppeteer';
import assert from 'node:assert';
import { test, suite } from 'node:test';
import startServer from './modules/server/index.js';
import testScenarios from './config.js';

const filenameRegex = /^[\w-_]+$/;

suite('Visual Regression Suite', async () => {
    await startServer();

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium',
        args: ['--no-sandbox'],
    });

    testScenarios.forEach((scenario, index) => {
        const testInfo = JSON.stringify(scenario);

        scenario.viewports.forEach((viewport) => {
            const testName = `${scenario.description} - ${viewport.name}`;

            test(testName, async () => {
                const context = await browser.createBrowserContext();
                const page = await context.newPage();
    
                await page.goto(scenario.url);
    
                // TODO: FIX THIS
                // scenario.waitForElements.forEach(async (selector) => {
                //     await page.waitForSelector(selector, { visible: true });
                // });

                const screenshotName = testName
                    .toLowerCase()
                    .replace(/\s/g, '_')
                    .replace(/[^\w-_]/g, '') + '.png';

                // TODO: Get path and then upload to the test images directory
                console.log(`screenshotName: "${screenshotName}"`);
                
                await context.close();

                assert.equal(1, 1);
            });
        });
    });
});
