//Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '5mpmnFqeHPHUGhhGq1KXeejUEnSYybObUoRw1FoL2CjFZnrmGJruHTlbUxag';
//Exported functionns
module.exports = {
  generateTokenForUser: function(email, userType){
    return jwt.sign({ email,  userType },
    JWT_SIGN_SECRET,
    {
      expiresIn: '744h' 
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUser: function(authorization) {
    var user = null;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          user = jwtToken;
      } catch(err) { }
    }
    return user;
  },
  facade: function(authorization) {
    var verif = null;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      verif = token == JWT_SIGN_SECRET
    }
    return verif;
  }
}
