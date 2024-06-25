import puppeteer from 'puppeteer';
import assert from 'node:assert';
import { test, suite, before, after, beforeEach, afterEach } from 'node:test';
import testScenarios from '../../config.js';
import { compareImages, takeTestScreenshot } from './imageComparison.js';
import buildReport from './buildReport.js';

const maxAllowedDiffPixels = 0;
const testsPassed = [];
const testsFailed = [];

let browser;
let context;
let page;

suite('Visual Regression Suite', async () => {
    before(async () => {
        browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium',
            args: ['--no-sandbox'],
        });
    });

    after(async () => {
        browser.close();
        buildReport({ testsPassed, testsFailed });
    });

    beforeEach(async () => {
        context = await browser.createBrowserContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        context.close();
    });

    for await (const scenario of testScenarios) {
        for await (const viewport of scenario.viewports) {
            const testName = `${scenario.description} - ${viewport.name}`;

            test(testName, async () => {
                await page.setViewport(viewport);
    
                await page.goto(scenario.url);

                for await (const selector of scenario.waitForElements) {
                    page.waitForSelector(selector);
                }

                const screenshotName = testName
                    .toLowerCase()
                    .replace(/\s/g, '_')
                    .replace(/[^\w-_]/g, '') + '.png';

                await takeTestScreenshot(page, screenshotName);

                const numOfDiffPixels = compareImages(screenshotName);

                if (numOfDiffPixels === maxAllowedDiffPixels) {
                    testsPassed.push({ testName, screenshotName });
                } else {
                    testsFailed.push({ testName, screenshotName });
                }

                // TODO: Add means to approve/deny reference image updates
                assert.equal(numOfDiffPixels, maxAllowedDiffPixels, 'Expected pixel difference of test and reference images to be zero');
            });
        }
    }
});
