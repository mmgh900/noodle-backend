const serverConfig = {
  hostname: '127.0.0.1',
  port: 5000,
  eventEmitter: null
};

const routerConfig = {
  eventEmitter: null
};

const servicesDirectory = './services';

const UserTypes = {
  "employee": 1,
  "supporter": 2,
  "admin": 3
}


module.exports = {
  serverConfig,
  routerConfig,
  servicesDirectory,
  UserTypes
};