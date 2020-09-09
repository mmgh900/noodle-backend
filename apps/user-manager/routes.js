const userCtrl = require('./controllers/user');

module.exports = {
  '/users': {
    GET: {
      function: userCtrl.getUsers,
      middlewares: []
    }
  }
};