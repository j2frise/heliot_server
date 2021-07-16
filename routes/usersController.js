//imports
var bcrypt = require('bcryptjs');
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");
var jwtUtils = require('../utils/jwt.utils');

//Routes
module.exports = {
  login: function(req, res){
    //get params
    var email = req.body.email?req.body.email:null;
    var token = req.body.token?req.body.token:null;

    if(!(email && token)){
      return res.status(201).json({'status':500, 'response': "Données manquantes"});
    }

    return res.status(201).json({
      'status':201,
      'data': {
        'token': jwtUtils.generateTokenForUser(email)
      }
    });
  }
}