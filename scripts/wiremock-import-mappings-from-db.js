const { MongoClient } = require('mongodb');
const fetch = (url, init) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init));

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'YOURDATABASENAME';

const main = async () => {
  await client.connect();
  console.log('Connected successfully to database');
  const db = client.db(dbName);
  const collection = db.collection('mappings');

  const findResult = await collection.find({}).toArray();
  console.log(`found ${findResult.length} mappings`);

  const data = {
    mappings: findResult.map(({ _id, ...mapping }) => mapping),
    importOptions: {
      deleteAllNotInImport: true,
    },
  };

  const response = await fetch('http:localhost:8081/__admin/mappings/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  if (response.status === 200) {
    return 'successfully imported mappings';
  }

  console.log('failed to import mappings');
  return await response.json();
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
