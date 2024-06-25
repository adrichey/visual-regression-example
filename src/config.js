import viewports from './modules/viewports.js';
import { checkArrayOfObjectsForUniquenes } from './modules/validation.js';

const testScenarios = [
    {
        description: "Localhost - Index Page",
        viewports: [...viewports],
        url: 'http://0.0.0.0:8000', // TODO: GRAB THIS FROM ENV
        waitForElements: ['#main-header'],
        // TODO: Improve this so it can run scripts in addition to just visiting a page and wait on a selector.
    },
    {
        description: "Localhost - About Page",
        viewports: [...viewports],
        url: 'http://0.0.0.0:8000/about',
        waitForElements: ['#main-header'],
    },
];

if (!checkArrayOfObjectsForUniquenes(testScenarios, 'description')) {
    throw new Error(`Non-distinct testScenario descriptions(s) found. Please ensure all testScenarios description attributes in s${__filename} are unique.`);
}

export default testScenarios;
