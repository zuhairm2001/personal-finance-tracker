const axios = require("axios");
const { URLSearchParams } = require("url");
const config = require("../config/BASIQ.js");

class BasiqService {
  constructor() {
    this.apiUrl = config.BASIQ_API_URL;
    this.apiKey = config.BASIQ_API_KEY;
    this.apiVersion = config.BASIQ_API_VERSION;
    this.token = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.token && this.tokenExpiry > Date.now()) {
      return this.token;
    }

    const encodedParams = new URLSearchParams();
    encodedParams.set("scope", "SERVER_ACCESS");

    try {
      const response = await axios({
        method: "POST",
        url: `${this.apiUrl}/token`,
        headers: {
          accept: "application/json",
          "basiq-version": this.apiVersion,
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${this.apiKey}`,
        },
        data: encodedParams,
      });

      this.token = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
      return this.token;
    } catch (error) {
      console.error("Error getting BASIQ access token:", error);
      throw error;
    }
  }

  async makeRequest(method, endpoint, data = null) {
    const token = await this.getAccessToken();

    try {
      const response = await axios({
        method,
        url: `${this.apiUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "basiq-version": this.apiVersion,
        },
        data,
      });

      return response.data;
    } catch (error) {
      console.error(`Error making BASIQ API request to ${endpoint}:`, error);
      throw error;
    }
  }

  // Add more methods for specific BASIQ API operations here
}

module.exports = new BasiqService();
