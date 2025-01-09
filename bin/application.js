import { serviceIpstack } from './service-ipstack.js';

const RegExpIPv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const RegExpIPv6 = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/;

/**
 * The Application module implements the GeoIP commands.
 */
class Application
{
    /**
     * Returns the longitude & latitude for a given IP.
     *
     * @param ip
     * @returns Promise<string>
     */
    async getLatLongForIp(ip)
    {
        if ( !ip )
        {
            return Promise.reject('Mandatory parameter ip missing');
        }

        const isIPv4 = RegExpIPv4.test(ip);
        const isIPv6 = RegExpIPv6.test(ip);

        if ( !isIPv4 && !isIPv6 )
        {
            return Promise.reject('The ip is not IPv4 or IPv6');
        }

        const response = await serviceIpstack.getMain(ip)
            .catch((error) => { return Promise.reject(error); });

        const data = response.data;
        if ( !data )
        {
            return Promise.reject('The response has no data property');
        }

        if ( !data.success && data.error )
        {
            return Promise.reject(data.error.info);
        }

        const latitude = data.latitude;
        const longitude = data.longitude;

        if ( !latitude || !longitude )
        {
            return Promise.reject('The data property has no latitude or longitude properties');
        }

        const result = `lat. ${latitude}, long. ${longitude}`;
        return Promise.resolve(result);
    }
}

export let application = new Application();
