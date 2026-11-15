// Minimal static file server for the TresVern site (no dependencies).
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http.createServer((req, res) => {
  let rel;
  try {
    rel = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }
  if (rel === '/') rel = '/index.html';
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT + path.sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const cache = type.startsWith('text/html') ? 'no-cache' : 'public, max-age=86400';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': cache }).end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`TresVern site listening on ${PORT}`));
