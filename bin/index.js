#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { application } from './application.js';

if ( !process.env.IPSTACK_ACCESS_KEY )
{
    console.error('Environment variable IPSTACK_ACCESS_KEY is missing');
    process.exit(1);
}

const argv = yargs(process.argv.slice(2))
    .scriptName('geoip')
    .usage('Usage: $0 [ip]')
    .command('ip', 'The IP address in IPv4 or IPv6 format')
    .demandCommand(1)
    .argv;

(async () => {
    const ip = argv['_'][0];
    application.getLatLongForIp(ip)
        .catch((error) => {
            console.error(error);
            process.exit(1);
        })
        .then((result) => {
            console.log(result);
            process.exit();
        });
})();
