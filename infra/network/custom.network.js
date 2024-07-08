const axios = require("axios").default;
module.exports = class CustomNetwork {
  constructor({ customLogger }) {
    this.logger = customLogger.initLogger("NetworkAPI");
  }
  GET = async (url, data, option = {}) => {
    this.logger.info(`API CALLING (GET)=>(${url})`);
    const response = await axios
      .get(url, { data, ...{ option } })
      .catch((e) => {
        this.logger.error(e);
      });
    return response.data;
  };
  POST = async (url, data, option = {}) => {
    this.logger.info(`API CALLING (POST)=>(${url})`);
    const response = await axios
      .post(url, data, { withCredentials: true, ...option })
      .catch((e) => {
        this.logger.error(e);
      });
    return response;
  };
  PUT = async (url, data, option = {}) => {
    this.logger.info(`API CALLING (PUT)=>(${url})`);
    const response = await axios.put(url, data, option).catch((e) => {
      this.logger.error(e);
    });
    return response.data;
  };
  DELETE = async (url, data, option = {}) => {
    this.logger.info(`API CALLING (DELETE)=>(${url})`);
    const response = await axios.delete(url, data, option).catch((e) => {
      this.logger.error(e);
    });
    return response.data;
  };
};
