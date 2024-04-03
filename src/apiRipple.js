import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class RippleApi {
  // the token for interaction with Ripple database will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("DB Call:", endpoint, data, method);

    // pass token in header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${RippleApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // login a user and get token
  static async loginUser(data) {
    try {
      let res = await this.request(`auth/token`, { ...data }, "post");
      return res;
    } catch (err) {
      return err;
    }
  }

  // register a user and get token
  static async registerUser(data) {
    try {
      let res = await this.request(`auth/register`, { ...data }, "post");
      return res;
    } catch (err) {
      return err;
    }
  }

  // get all users back from db
  static async getUsers() {
    try {
      const res = await this.request(`users/`);
      return res;
    } catch (err) {
      return err;
    }
  }

  // get single user back based on username
  static async getUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  // patch single users profile
  static async patchUser(username, data) {
    try {
      let res = await this.request(`users/${username}`, { ...data }, "patch");
      return res;
    } catch (err) {
      return err;
    }
  }

  // get all waves in db
  static async getWaves() {
    try {
      let res = await this.request(`waves/`);
      return res;
    } catch (err) {
      return err;
    }
  }

  // get single wave based on id
  static async getWave(id) {
    try {
      let res = await this.request(`waves/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  // create a new wave
  static async postWave(data) {
    try {
      let res = await this.request(`waves/`, { ...data }, "post");
      return res;
    } catch (err) {
      return err;
    }
  }

  // patch wave based on id and data
  static async patchWave(id, data) {
    try {
      let res = await this.response(`waves/${id}`, { ...data }, "patch");
      return res;
    } catch (err) {
      return err;
    }
  }

  // Method for deleting a single wave
  static async deleteWave(id) {
    try {
      let res = await this.request(`waves/${id}`, {}, "delete");
      return res;
    } catch (err) {
      return err;
    }
  }

  // Methods for handling comments
  static async getComments(waveId) {
    try {
      let res = await this.request(`waves/${waveId}/comments`);
      return res;
    } catch (err) {
      return err;
    }
  }

  //get a comment
  static async getComment(waveId, commentId) {
    try {
      let res = await this.request(`waves/${waveId}/comments/${commentId}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  //post a new comment
  static async postComment(waveId, data) {
    try {
      let res = await this.request(
        `waves/${waveId}/comments`, { ...data }, "post"
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  //patch a comment
  static async patchComment(waveId, commentId, data) {
    try {
      let res = await this.request(
        `waves/${waveId}/comments/${commentId}`,
        { ...data },
        "patch"
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  //delete a comment
  static async deleteComment(waveId, commentId) {
    try {
      let res = await this.request(
        `waves/${waveId}/comments/${commentId}`,
        {},
        "delete"
      );
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default RippleApi;

