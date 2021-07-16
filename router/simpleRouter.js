var express = require('express');
var usersCtrl = require('../routes/usersController');

//Router
exports.router = (function(){
    var simpeRouter = express.Router();
    
    //Users routes
    simpeRouter.route('/login/').post(usersCtrl.login);

    return simpeRouter
})();