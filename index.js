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

router.addRoute({route: '/r1', method: 'GET', handler: 'f1', middlewares: []});
server.start();

