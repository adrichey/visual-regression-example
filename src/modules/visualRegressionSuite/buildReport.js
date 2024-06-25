import fs from 'node:fs';
import path from 'node:path';

const headerTemplate = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap demo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <style>
            .b-example-divider {
                width: 100%;
                height: 3rem;
                background-color: rgba(0, 0, 0, .1);
                border: solid rgba(0, 0, 0, .15);
                border-width: 1px 0;
                box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
            }

            pre {
                display: inline-block;
                padding: 9.5px;
                margin: 0 0 10px;
                font-size: 13px;
                line-height: 1.42857143;
                color: #333;
                word-break: break-all;
                word-wrap: break-word;
                background-color: #f5f5f5;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
`;

const footerTemplate = `
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </body>
</html>`;

const createTestBlockHTML = (testName, screenshotName, success = true) => {
    const icon = success ? "✅" : "❌";
    return `
        <div class="container px-4 py-5">
            <h2 class="pb-2 border-bottom">${icon} ${testName}</h2>
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div class="feature col">
                    <h3 class="fs-2 text-body-emphasis">Reference</h3>
                    <img class="img-fluid border" src="referenceImages/${(screenshotName)}">
                </div>
                <div class="feature col">
                    <h3 class="fs-2 text-body-emphasis">Test</h3>
                    <img class="img-fluid border" src="testImages/${(screenshotName)}">
                </div>
                <div class="feature col">
                    <h3 class="fs-2 text-body-emphasis">Diff</h3>
                    <img class="img-fluid border" src="diffImages/${(screenshotName)}">
                </div>
            </div>
            <div class="row row-cols-12">
                <div class="feature col">
                    <p>To overwrite this reference with the test image, run the following command:</p>
                    <pre>docker exec &lt;id_or_name_of_docker_container&gt; npm run vr-approve -- ${screenshotName}</pre>
                </div>
            </div>
        </div>
    `;
};

const createTestsHTML = (tests = [], success = true) => {
    let html = '';

    for (let i = 0; i < tests.length; i++) {
        const { testName, screenshotName } = tests[i];
        html += createTestBlockHTML(testName, screenshotName, success);

        if (i !== (tests.length - 1)) {
            html += `
                <div class="b-example-divider"></div>
            `;
        }
    }

    return html;
};

const buildReport = (options = { testsPassed: [], testsFailed: [] }) => {
    const { testsPassed, testsFailed } = options;
    console.log("testsPassed:" + JSON.stringify(testsPassed));
    console.log("testsFailed:" + JSON.stringify(testsFailed));
    const filePath = path.resolve(import.meta.dirname, '../../summary/index.html');

    const header = `
        <div class="row g-4 pt-5 row-cols-12">
            <div class="feature col text-center">
                <h1 id="main-header">Visual Regression Summary</h1>
                <h2><span class="text-success">${testsPassed.length} passed</span> | <span class="text-danger">${testsFailed.length} failed</span></h2>
            </div>
        </div>
        <div class="row g-4 py-5 row-cols-12">
            <div class="feature col text-center">
                <p>To overwrite all current references with their test images, run the following command:</p>
                <pre>docker exec &lt;id_or_name_of_docker_container&gt; npm run vr-approve -- --all</pre>
            </div>
        </div>
        <div class="b-example-divider"></div>
    `;

    let html = headerTemplate + header;
    html += createTestsHTML(testsFailed, false);

    html += `
        <div class="b-example-divider"></div>
    `;

    html += createTestsHTML(testsPassed);
    html += footerTemplate;

    fs.writeFileSync(filePath, html);
};

export default buildReport;
