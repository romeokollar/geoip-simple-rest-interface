import axios from 'axios';

/**
 * The ServiceIpstack module implements the API calls to Ipstack. Please refer the documentation for more information:
 * https://ipstack.com/documentation
 */
class ServiceIpstack
{

    /**
     * Returns the API access key, the unique authentication key used to gain access to the ipstack API.
     *
     * @returns String
     */
    getAccessKey()
    {
        return process.env.IPSTACK_ACCESS_KEY;
    }

    /**
     * Returns the main API objects from "ip" to "longitude" for a given IP.
     *
     * @param ip
     * @returns Promise<*>
     */
    async getMain(ip)
    {
        ip = ip || '';
        const access_key = this.getAccessKey();
        const url = `https://api.ipstack.com/${ip}?access_key=${access_key}&fields=main`;
        return axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch((error) => {
            const json = error.toJSON();
            return Promise.reject(json.message);
        });
    }
}

export let serviceIpstack = new ServiceIpstack();
