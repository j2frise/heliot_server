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
    console.log(req.user);
    var email = req.user.email;

    if(!(email)){
      return res.status(201).json({'status':500, 'response': "Données manquantes"});
    }

    let getHETIC = email.split("@")
    getHETIC = getHETIC[1].split(".")

    if(!(getHETIC.length == 2 && (getHETIC[0].toLowerCase() =="hetic" || getHETIC[0].toLowerCase() =="arcplex"))){
      return res.status(503).json({'status':401, 'response': 'votre compte n\'est pas autorisé'});
    } 

    if(!(email)){
      return res.status(201).json({'status':500, 'response': "Données manquantes"});
    }

    return res.status(201).json({
      'status':201,
      'data': {
        'token': jwtUtils.generateTokenForUser(email),
        'user': req.user
      }
    });
  }
}