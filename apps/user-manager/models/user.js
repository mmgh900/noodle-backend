let usersList = [];

class User {
  constructor(user) {
    this._username = user.username;
    this._password = user.password || null;
    this._name = user.name || null;
    this._family = user.family || null;
  }

  save() {
    let user = {
      username: this._username,
      name: this._name,
      family: this._family
    };
    usersList.push(user);
  }

  static getAll() {
    return usersList.map(user => {
      user = JSON.parse(JSON.stringify(user));
      delete user.password;
      return user;
    });
  }

}

module.exports = User;