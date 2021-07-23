var express = require('express');
var buildCtrl = require('../routes/buildController');
var iotDataCtrl = require('../routes/iotDataController');

//Router
exports.router = (function(){
    var facadeRouter = express.Router();
    
    facadeRouter.route('/entities/').get(buildCtrl.entitiesListFacade);
    facadeRouter.route('/dispositifs/').get(iotDataCtrl.dispositifsListFacade);

    return facadeRouter
})();