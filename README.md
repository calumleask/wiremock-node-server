# WireMock Node Server

Uses the [wiremock](https://www.npmjs.com/package/wiremock) npm package.

## Requirements

- node (tested v16.17.0)
- npm (tested v8.15.0)
- Java (tested OpenJDK v19.0.2)
- MongoDB (tested MongoDB Community Edition v6.0.4) - optional

## Setup

- `npm install`

## Running the Server

- `npm start`

Wiremock instance will be available on port `8081`

Express server acts as a proxy and is available on port `8080` (Probably not required but no harm in keeping for now)

Visit http://localhost:8080/api/example and you should see the following text 'This is an api response'

### Export data from wiremock to json

- `npm run wiremock:json-export`

Exports the wiremock mappings to json at `export/wiremock-mappings-export.json`

## Running MongoDB (optional)

- `npm run db:serve`

Will start the MongoDB at `mongodb://localhost:27017` in the folder `mongodb/db`

### Migrate initial data

- `npm run db:migrate`

Performs an initial migration of the initial data found at `mongodb/migrations/data/mappings.json` into the db.

### Export data from db to json

- `npm run db:json-export`

Exports the wiremock mappings in the db to json at `export/db-mappings-export.json`

### Import data from db to wiremock

- `npm run wiremock:db-import`

Imports the mappings in the db into the wiremock instance
