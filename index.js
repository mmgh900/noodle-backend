const fs = require('fs');
const EventEmitter = require('events');
const Server = require('noodle-server');
const Router = require('noodle-router');
const c = require('./config');
const eventEmitter = new EventEmitter();

c.serverConfig.eventEmitter = eventEmitter;
c.routerConfig.eventEmitter = eventEmitter;
const server = new Server(c.serverConfig);
const router = new Router(c.routerConfig);

server.start();
loadApps();

function loadApps() {
    const serviceNames = fs.readdirSync(c.servicesDirectory);
    serviceNames.forEach(appName => {

        const app = require(`${c.servicesDirectory}/${appName}`);

        // Initializing models to create database tales if do not exist
        const modelsNames = fs.readdirSync(`${c.servicesDirectory}/${appName}/models`);
        modelsNames.forEach(async modelName => {
            const model = require(`${c.servicesDirectory}/${appName}/models/${modelName}`);
            try {
                await model.init()
            } catch (error) {
                console.log(error)
            }

        })



        Object.keys(app.routes).forEach(route => {
            Object.keys(app.routes[route]).forEach(method => {
                const routeObj = {
                    route,
                    method,
                    function: app.routes[route][method].function,
                    middlewares: app.routes[route][method].middlewares
                };
                router.addRoute(routeObj);
            });
        });
    });
}
