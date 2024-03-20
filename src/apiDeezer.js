import axios from "axios";

const BASE_URL = "https://api.deezer.com";

class DeezerApi {
    static async request(endpoint, data={}, method="get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {};
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch(err) {
            console.error("Deezer Api Error", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async search() {
        try {
            let res = await this.request("search", {q: query});
            console.log(`DeezerApi search res`, res.data);
            return res.data
        } catch (err) {
            return err;
        }
    }
}

export default DeezerApi