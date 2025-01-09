# GeoIP-Simple-REST-interface-PE
CLI for obtaining the latitude and longitude of an IP address.

## Requirements
The CLI requires the following:
* Node v22
* `IPSTACK_ACCESS_KEY` environment is set; the unique authentication key used to gain access to the ipstack API

## Installation
To install the `geoip` CLI locally, follow the steps below:

    npm install
    npm install -g

To get the help:

    geoip

To get longitude / latitude for an IP (example):

    geoip 134.201.250.155

Returns:

    lat. 34.04563903808594, long. -118.24163818359375

## Docker
The Dockerfile is provided with the project to deliver the tool as a docker container.

To build and run:

    docker build -t geoip --build-arg access_key=$IPSTACK_ACCESS_KEY .
    docker run -it geoip bash

Note:
* TODO: for security avoid ARG and ENV instructions and replace with build secrets

## Implementation
The CLI has been developed following Unix principles, and the implementation is covered with both unit and integration tests.

Source code (`bin`):
* `application.js`, implements the Application-logic
* `index.js`, the entry point, provides the CLI
* `service-ipstack.js`, implements the API for accessing ipstack API

To run the development code:

    node .

Tests (`test`):
* `application.spec.js`, unit-test for the Application implementation
* `service-ipstack.spec.js`, integration-test for the ServiceIpstack implementation

To run the tests:

    npm run test

To run the eslint:

    npm run eslint

## Future
To extend the version to support additional parameters, such as:
* pass filename with multiple IP addresses to query
* include extra Geo-fields, e.g. country_code, capital, etc
* define output format; text, JSON, XML
