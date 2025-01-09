import {expect, assert} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import { application } from '../bin/application.js';
import { serviceIpstack } from '../bin/service-ipstack.js';

// IPv4: 134.201.250.155
// IPV6 Expanded (Shortened): 0:0:0:0:0:ffff:86c9:fa9b
// IPV6 Expanded: 0000:0000:0000:0000:0000:ffff:86c9:fa9b
const TEST_RESULT_LAT_LONG = {
    data: {
        latitude: 34.04563903808594,
        longitude: -118.24163818359375
    }
}

const TEST_RESULT_NO_DATA = {
};

const TEST_RESULT_NO_LAT_LONG = {
    data: {
    }
};

describe('application',  () =>
{
    let mockServiceIpstack;

    before(() =>
    {
        mockServiceIpstack = sinon.stub(serviceIpstack, 'getMain').returns(Promise.resolve(TEST_RESULT_LAT_LONG));
    });

    after(() =>
    {
        mockServiceIpstack.restore();
    });

    it('test-missing-ip', async () =>
    {
        const result = await application.getLatLongForIp()
            .catch((error) => new Error(error));

        expect(result.message).to.equal('Mandatory parameter ip missing');
    });

    it('test-invalid-ip', async () =>
    {
        const result = await application.getLatLongForIp('invalid')
            .catch((error) => new Error(error));

        expect(result.message).to.equal('The ip is not IPv4 or IPv6');
    });

    it('test-valid-ipv4', async () =>
    {
        const result = await application.getLatLongForIp('134.201.250.155')
            .catch((error) => new Error(error));

        expect(result).to.equal('lat. 34.04563903808594, long. -118.24163818359375');
    });

    it('test-valid-ipv6-shortened', async () =>
    {
        const result = await application.getLatLongForIp('0:0:0:0:0:ffff:86c9:fa9b')
            .catch((error) => new Error(error));

        expect(result).to.equal('lat. 34.04563903808594, long. -118.24163818359375');
    });

    it('test-valid-ipv6', async () =>
    {
        const result = await application.getLatLongForIp('0000:0000:0000:0000:0000:ffff:86c9:fa9b')
            .catch((error) => new Error(error));

        expect(result).to.equal('lat. 34.04563903808594, long. -118.24163818359375');
    });

    it('test-no-data', async () =>
    {
        mockServiceIpstack.restore();
        mockServiceIpstack = sinon.stub(serviceIpstack, 'getMain').returns(Promise.resolve(TEST_RESULT_NO_DATA));

        const result = await application.getLatLongForIp('134.201.250.155')
            .catch((error) => new Error(error));

        expect(result.message).to.equal('The response has no data property');
    });

    it('test-no-lat-long', async () =>
    {
        mockServiceIpstack.restore();
        mockServiceIpstack = sinon.stub(serviceIpstack, 'getMain').returns(Promise.resolve(TEST_RESULT_NO_LAT_LONG));

        const result = await application.getLatLongForIp('134.201.250.155')
            .catch((error) => new Error(error));

        expect(result.message).to.equal('The data property has no latitude or longitude properties');
    });

});