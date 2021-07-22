var express = require('express');
var buildCtrl = require('../routes/buildController');

//Router
exports.router = (function(){
    var facadeRouter = express.Router();
    
    facadeRouter.route('/entities/').get(buildCtrl.entitiesList);
    facadeRouter.route('/test/').get(buildCtrl.test);


    return facadeRouter
})();