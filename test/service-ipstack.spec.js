import {assert, expect} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import { serviceIpstack } from '../bin/service-ipstack.js';

const TEST_RESULT_IPv4 = {
    "ip": "134.201.250.155",
    "type": "ipv4",
    "continent_code": "NA",
    "continent_name": "North America",
    "country_code": "US",
    "country_name": "United States",
    "region_code": "CA",
    "region_name": "CA",
    "city": "Los Angeles",
    "zip": "90013",
    "latitude": 34.04563903808594,
    "longitude": -118.24163818359375,
    "msa": "31100",
    "dma": "803",
    "radius": null,
    "ip_routing_type": null,
    "connection_type": null
}

const TEST_RESULT_IPv6 = {
    "ip": "0000:0000:0000:0000:0000:ffff:86c9:fa9b",
    "type": "ipv6",
    "continent_code": null,
    "continent_name": null,
    "country_code": null,
    "country_name": null,
    "region_code": null,
    "region_name": null,
    "city": null,
    "zip": null,
    "latitude": 0,
    "longitude": 0,
    "msa": null,
    "dma": null,
    "radius": null,
    "ip_routing_type": null,
    "connection_type": null
}

describe('service-ipstack',  () =>
{

    it('test-invalid-access-key', async () =>
    {
        const mockServiceIpstack = sinon.stub(serviceIpstack, 'getAccessKey').returns('');

        const response = await serviceIpstack.getMain('134.201.250.155')
            .catch((error) => new Error(error));

        serviceIpstack.getAccessKey.restore();

        const data = response.data;
        expect(data.error.info).to.equal('You have not supplied an API Access Key. [Required format: access_key=YOUR_ACCESS_KEY]');
    });

    it('test-invalid-ip-address', async () =>
    {
        const response = await serviceIpstack.getMain('invalid')
            .catch((error) => new Error(error));

        const data = response.data;
        expect(data.error.info).to.equal('The IP Address supplied is invalid.');
    });

    it('test-invalid-fields', async () =>
    {
        const response = await serviceIpstack.getMain('')
            .catch((error) => new Error(error));

        expect(response.toString()).to.equal('Error: Request failed with status code 403');
    });

    it('test-ipv4', async () =>
    {
        const response = await serviceIpstack.getMain('134.201.250.155')
            .catch((error) => new Error(error));

        assert.deepEqual(response.data, TEST_RESULT_IPv4);
    });

    it('test-ipv6', async () =>
    {
        const response = await serviceIpstack.getMain('0000:0000:0000:0000:0000:ffff:86c9:fa9b')
            .catch((error) => new Error(error));

        assert.deepEqual(response.data, TEST_RESULT_IPv6);
    });
});