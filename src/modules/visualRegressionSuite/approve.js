import fs from 'node:fs';
import path from 'node:path';
import { getTestImagesPath, getReferenceImagesPath } from './imageComparison.js';

const fileToApprove = process.argv[2];

if (fileToApprove === '--all') {
    const files = fs.readdirSync(getTestImagesPath());
    for (const file of files) {
        const testFile = getTestImagesPath(file);

        fs.stat(testFile, (err, stats) => {
            if (err) {
                return;
            }

            if (!stats.isDirectory()) {
                const basename = path.basename(testFile);
                fs.copyFileSync(testFile, getReferenceImagesPath(basename));
            }
        });
    }
} else {
    const testFile = getTestImagesPath(fileToApprove);

    fs.stat(testFile, (err, stats) => {
        if (err) {
            throw new Error('"' + testFile + '" does not exist')
        }

        if (stats.isDirectory()) {
            throw new Error('"' + testFile + '" is a directory, cannot copy to references');
        }

        const basename = path.basename(testFile);
        fs.copyFileSync(testFile, getReferenceImagesPath(basename));
    });
}
