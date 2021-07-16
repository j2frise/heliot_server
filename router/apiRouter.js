//imports
var express = require('express');

var commonCtrl = require('../routes/commonController');
var buildCtrl = require('../routes/buildController');
var iotDataCtrl = require('../routes/iotDataController');



//Router
exports.router = (function(){
    var apiRouter = express.Router();

    //IoT data routes
    apiRouter.route('/presences/').get(iotDataCtrl.presencesList);
    apiRouter.route('/dispositifs/:entityId').get(iotDataCtrl.dispositifsList);

    //Build routes
    apiRouter.route('/dispositifs-data/').get(buildCtrl.dispositifsDataList);
    apiRouter.route('/entities/').get(buildCtrl.entitiesList);
    apiRouter.route('/buildings/').get(buildCtrl.buildingsList);
    apiRouter.route('/floors/').get(buildCtrl.floorsList);

    //Common routes
    apiRouter.route('/status/').get(commonCtrl.statusList);
    apiRouter.route('/that-dispositifs/').get(commonCtrl.thatDispositifsList);
    apiRouter.route('/dispositifs-types/').get(commonCtrl.dispositifsTypesList);
    apiRouter.route('/entities-types/').get(commonCtrl.entitiesTypesList);

    return apiRouter
})();