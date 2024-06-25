import fs from 'node:fs';
import http from 'node:http';

/**
 * Starts a node server that maps to http://0.0.0.0:8000
 * This should be accessible from http://localhost:8080
 * See docker-compose.yml for mapping information
 */
const hostname = '0.0.0.0';
const port = 8000;

const indexHTML = fs.readFileSync(`${import.meta.dirname}/index.html`);
const aboutHTML = fs.readFileSync(`${import.meta.dirname}/about.html`);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/about') {
        res.end(aboutHTML);
    } else {
        res.end(indexHTML);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
