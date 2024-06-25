import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const getTestImagesPath = (fileToResolve = '') => {
    return path.resolve(import.meta.dirname, `../testImages/${fileToResolve}`);
};

const getReferenceImagesPath = (fileToResolve = '') => {
    return path.resolve(import.meta.dirname, `../referenceImages/${fileToResolve}`);
};

const getDiffImagesPath = (fileToResolve = '') => {
    return path.resolve(import.meta.dirname, `../diffImages/${fileToResolve}`);
};

export const takeTestScreenshot = async (page, screenshotName) => {
    const screenshotPath = getTestImagesPath(screenshotName);
    await page.screenshot({
        path: screenshotPath,
        type: 'png',
    });
};

export const compareImages = (screenshotName) => {
    const pathToReferenceImage = getReferenceImagesPath(screenshotName);
    const pathToTestImage = getTestImagesPath(screenshotName);
    const pathToDiffImage = getDiffImagesPath(screenshotName);

    const referenceImage = PNG.sync.read(fs.readFileSync(pathToReferenceImage));
    const testImage = PNG.sync.read(fs.readFileSync(pathToTestImage));
    const { width, height } = referenceImage;
    const diffImage = new PNG({ width, height });
    
    const numOfDiffPixels = pixelmatch(referenceImage.data, testImage.data, diffImage.data, width, height, { threshold: 0.1 });
    
    fs.writeFileSync(pathToDiffImage, PNG.sync.write(diffImage));

    return numOfDiffPixels;
};
