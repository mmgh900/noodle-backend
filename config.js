
const serverConfig = {
  hostname: '127.0.0.1',
  port: 5000,
  getUrl: function () {
    return `http://${this.hostname}:${this.port}`
  },
  eventEmitter: null
};

const routerConfig = {
  eventEmitter: null
};

const servicesDirectory = './services';

const authConfig = {
  TOKEN_KEY: "NoodlesAreDelicious"
}

const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const authenticator = new Authenticator(authConfig)
const defaultMiddlewares = [authenticator, dataParser]

module.exports = {
  serverConfig,
  routerConfig,
  servicesDirectory,
  authConfig,
  defaultMiddlewares
};