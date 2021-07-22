var express = require('express');
var buildCtrl = require('../routes/buildController');
var iotDataCtrl = require('../routes/iotDataController');

//Router
exports.router = (function(){
    var facadeRouter = express.Router();
    
    facadeRouter.route('/entities/').get(buildCtrl.entitiesList);
    apiRouter.route('/dispositifs/').get(iotDataCtrl.dispositifsList);
    facadeRouter.route('/test/').get(buildCtrl.test);


    return facadeRouter
})();