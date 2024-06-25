import { checkArrayOfObjectsForUniquenes } from './validation.js';

/**
 * Matches viewport interface options for Puppeteer:
 * https://pptr.dev/api/puppeteer.viewport
 */
const defaultViewport = {
    name: 'default',
    deviceScaleFactor: 1,
    hasTouch: false,
    height: 1920,
    isLandscape: false,
    isMobile: false,
    width: 1080,
};

const desktop = Object.assign({}, defaultViewport, {
    name: 'Desktop',
});

const mobile = Object.assign({}, defaultViewport, {
    name: 'Mobile',
    height: 926,
    width: 428,
    isMobile: true,
    hasTouch: true,
});

const mobileLandscape = Object.assign({}, defaultViewport, {
    name: 'Mobile (Landscape)',
    height: 428,
    width: 926,
    isMobile: true,
    hasTouch: true,
    isLandscape: true,
});

const tablet = Object.assign({}, defaultViewport, {
    name: 'Tablet',
    height: 1080,
    width: 810,
    isMobile: true,
    hasTouch: true,
});

const tabletLandscape = Object.assign({}, defaultViewport, {
    name: 'Tablet (Landscape)',
    height: 810,
    width: 1080,
    isMobile: true,
    hasTouch: true,
    isLandscape: true,
});

const viewports = [
    desktop,
    mobile,
    mobileLandscape,
    tablet,
    tabletLandscape,
];

if (!checkArrayOfObjectsForUniquenes(viewports, 'name')) {
    throw new Error(`Non-distinct viewport name(s) found. Please ensure all viewport name attributes in s${__filename} are unique.`);
}

export default viewports;
