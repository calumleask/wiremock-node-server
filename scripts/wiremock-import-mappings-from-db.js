const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');

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
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
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
