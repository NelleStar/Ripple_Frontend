import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class RippleApi {
    // the token for interaction with Ripple database will be stored here.
    static token;

    static async request(endpoint, data={}, method="get") {
        console.debug("DB Call:", endpoint, data, method);

        // pass token in header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${RippleApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch(err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // login a user and get token
    static async loginUser(data) {
        try {
            let res = await this.request(`auth/token`, { ...data }, "post");
            console.log(`API loginUser results:`, res);
            return res;
        } catch(err) {
            return err;
        }
    }

    // register a user and get token
    static async registerUser(data) {
        try {
            let res = await this.request(`auth/register`, { ...data }, "post");
            console.log(`API registerUser results:`, res);
            return res;
        } catch(err) {
            return err;
        }
    }

    // get all users back from db
    static async getUsers() {
        try {
            const res = await this.request(`users/`);
            console.log(`API getUsers results:`, res);
            return res;
        } catch(err) {
            return err
        }
    }

    // get single user back based on username
    static async getUser(username) {
        try {
            let res = await this.request(`users/${username}`);
            console.log(`API getUser results:`, res);
            return res;
        } catch(err) {
            return err;
        }
    }

    // patch single users profile
    static async patchUser(username, data) {
        try {
            let res = await this.request(`users/${username}`, { ...data }, "patch");
            console.log(`API patchUser results:`, res);
            return res;
        } catch(err) {
            return err;
        }
    }

    // get all waves in db
    static async getWaves() {
        try {
            let res = await this.request(`waves/`);
            console.log(`API getWaves results:`, res);
            return res;
        } catch(err) {
            return err;
        }
    }

    // get single wave based on id
    static async getWave(id) {
        try {
            let res = await this.request(`waves/${id}`);
            console.log(`API getWave results:`, res);
            return res;
        } catch(err){
            return err;
        }
    }

    // patch wave based on id and data
    static async patchWave(id, data) {
        try {
            let res = await this.response(`waves/${id}`, { ...data }, "patch")
            console.log(`API patchWave results:`, res);
            return res;
        } catch(err) {
            return err;
        }
    }
}

export default RippleApi;

