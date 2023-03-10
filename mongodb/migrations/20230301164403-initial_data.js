const { mappings } = require('./data/mappings.json');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (db, client) => {
    await db.collection('mappings').insertMany(
      mappings.map(data => {
        const uuid = data.id ?? uuidv4();
        return { ...data, _id: uuid, id: uuid, uuid };
      }),
    );
  },

  down: async (db, client) => {
    await db.collection('mappings').deleteMany({});
  },
};
