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

## Implementation
The CLI has been developed following Unix principles, and the code is covered by both unit and integration tests.
Dockerfile is provided with the project to deliver the tool as a docker container.

### Architecture
The source code is located under the `bin` folder.

    [index] --- [application] --- [service-ipstack]

* `application.js`, implements the Application-logic
* `index.js`, the entry point, provides the CLI
* `service-ipstack.js`, implements the API for accessing ipstack API

### Unit tests
Following test cases are testing the Application logic with mock ServiceIpstack (`application.spec.js`):
* test-missing-ip
* test-invalid-ip
* test-valid-ipv4
* test-valid-ipv6-shortened
* test-valid-ipv6
* test-no-data
* test-no-lat-long

### Integration tests
Following test cases are testing the ServiceIpstack API; i.e. the actual call to Ipstack API (`service-ipstack.spec.js`):
* test-invalid-access-key
* test-invalid-ip-address
* test-invalid-fields
* test-ipv4
* test-ipv6

## How to...
To run the development code:

    node .

To run the tests:

    npm run test

To run the eslint:

    npm run eslint

To build and run the Dockerfile:

    docker build -t geoip --build-arg access_key=$IPSTACK_ACCESS_KEY .
    docker run -it geoip bash

## Troubleshooting
**Your monthly usage limit has been reached. Please upgrade your Subscription Plan.**
* Go to https://ipstack.com/ and increase your monthly limit by upgrading your Subscription Plan.

**Environment variable IPSTACK_ACCESS_KEY is missing**
* Add environment variable `IPSTACK_ACCESS_KEY`; the value is the API Access Key provided on https://ipstack.com/dashboard.

## TODOs
1. Support additional parameters, such as:
   * pass filename with multiple IP addresses to query
   * include extra Geo-fields, e.g. country_code, capital, etc
   * define output format; text, JSON, XML
2. For security avoid ARG and ENV instructions in Dockerfile and replace with build secrets
