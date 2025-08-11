const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const http = require('node:http');

function get(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port: 4000, path: pathname, method: 'GET' }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, json: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, text: data }); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  console.log('[check] /api/health');
  console.log(await get('/api/health'));
  console.log('[check] /api/check/mongo');
  console.log(await get('/api/check/mongo'));
  console.log('[check] /api/check/stripe');
  console.log(await get('/api/check/stripe'));
})();


