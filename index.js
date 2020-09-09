const fs = require('fs');
const EventEmitter = require('events');
const Server = require('maya-server');
const Router = require('maya-router');
const c = require('./config');

const eventEmitter = new EventEmitter();

c.serverConfig.eventEmitter = eventEmitter;
c.routerConfig.eventEmitter = eventEmitter;
const server = new Server(c.serverConfig);
const router = new Router(c.routerConfig);

server.start();
loadApps();

function loadApps() {
  const appNames = fs.readdirSync(c.appsDirectory);
  appNames.forEach(appName => {
    const app = require(`${c.appsDirectory}/${appName}`);
    console.log('app', app);
    Object.keys(app.routes).forEach(route => {
      Object.keys(app.routes[route]).forEach(method => {
        const routeObj = {
          route,
          method,
          function: app.routes[route][method].function,
          middlewares: app.routes[route][method].middlewares
        };
        console.log('routeObj', routeObj);
        router.addRoute(routeObj);
      });
    });
  });
}
