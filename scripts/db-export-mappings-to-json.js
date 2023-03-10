const { MongoClient } = require('mongodb');
const fs = require('fs/promises');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'YOURDATABASENAME';

const outDir = 'export';
const outFile = 'db-mappings-export.json';

const main = async () => {
  await client.connect();
  console.log('Connected successfully to database');
  const db = client.db(dbName);
  const collection = db.collection('mappings');

  const findResult = await collection.find({}).toArray();
  console.log(`found ${findResult.length} mappings`);
  const content = JSON.stringify(
    { mappings: findResult.map(({ _id, ...rest }) => rest) },
    null,
    2,
  );
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outDir + '/' + outFile, content);
};

main()
  .catch(console.error)
  .finally(() => client.close());
