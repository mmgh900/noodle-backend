const userCtrl = require('./controllers/user');
const dataParser = require('maya-data-parser');

module.exports = {
  '/users': {
    GET: {
      function: userCtrl.getUsers,
      middlewares: []
    },
    POST: {
      function: userCtrl.createUser,
      middlewares: [dataParser]
    }
  }
};