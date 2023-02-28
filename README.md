# WireMock Node Server

Uses the [wiremock](https://www.npmjs.com/package/wiremock) npm package.

## Requirements

- node (tested v16.17.0)
- npm (tested v8.15.0)
- Java (tested OpenJDK v19.0.2)

## Setup

- npm install

## Running the Server

- npm start

Wiremock instance will be available on port `8081`

Express server acts as a proxy and is available on port `8080` (Probably not required but no harm in keeping for now)

Visit http://localhost:8080/api/example and you should see the following text 'This is an api response'

## Updating the mappings

Add a new `.json` file under `wiremock/mappings/` or update / replace the existing `wiremock/mappings/example.json` file. The wiremock instance will need to be restarted by running `npm start`
