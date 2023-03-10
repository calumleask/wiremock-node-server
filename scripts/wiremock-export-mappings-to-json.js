const fetch = require('node-fetch');
const fs = require('fs/promises');

const host = 'localhost';
const port = '8081';
const outDir = 'export';
const outFile = 'wiremock-mappings-export.json';

const main = async () =>
  fetch(`http://${host}:${port}/__admin/mappings`)
    .then(resp => resp.json())
    .then(({ mappings }) => {
      console.log(`found ${mappings.length} mappings`);
      return JSON.stringify({ mappings }, null, 2);
    })
    .then(async content => {
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(outDir + '/' + outFile, content);
    });

main().catch(console.error);
