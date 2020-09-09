class User {
  constructor(user) {
    this._username = user.username;
    this._password = user.password || null;
    this._name = user.name || null;
    this._family = user.family || null;
  }
  
  save(){
    
  }

}

module.exports = User;