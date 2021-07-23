//imports
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");
var moment  = require('moment');
const mqtt = require("mqtt");

//Routes
module.exports = {
  decision: function(req, res) {
    var topic = `WEB2-HETICLIOT/${req.params.nodeId}/${req.params.sensor}`;

    const mqtt_url = "mqtt://hetic.arcplex.fr";
    const options = {
      port: 1883,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      username: "HETICLIOT",
      password: "47580327",
    };
    const client = mqtt.connect(mqtt_url, options);
    const data = {
      "source_address": req.params.nodeId, 
      "sensor_id": parseInt(req.params.sensor), 
      "tx_time_ms_epoch": 1425334635362,
      "data": {"value": parseInt(req.params.data), "id": req.params.id }
    }

    client.on('connect', function() { // When connected
      // publish a message to a topic
      client.publish(topic, data, function() {
        console.log("Message is published");
        client.end(); // Close the connection when published
      });
    });

  },
  presencesList: function(req, res) {
    models.Presences.findAll({
      //
    }).then(function(list) {
      if (list.length) {
        res.status(200).json({"status":200, "data": list});
      } else {
        res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
      }
    }).catch(function(err) {
      res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
    });
  },
  dispositifsList: function(req, res) {
    models.Dispositifs.findAll({
      include: [
        { model: models.Entities },
        {  model: models.Dispositifs_types },
        {  model: models.That_dispositifs },
        {  model: models.Stats }
      ],
      where: { statId: {[Op.ne]:2} }
    }).then(function(list) {
      if (list.length) {
        res.status(200).json({"status":200, "data": list});
      } else {
        res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
      }
    }).catch(function(err) {
      res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
    });
  },
  dispositifsListFacade: function(req, res) {
    models.Dispositifs.findAll({
      attributes: ['id', 'entityId', 'dispositifTypeId', 'name'],
      include: [
        {  model: models.Dispositifs_types, attributes: ['id', 'temp', 'min', 'max', 'unit'] },
      ],
      where: { statId: {[Op.ne]:2} }
    }).then(function(list) {
      if (list.length) {
        res.status(200).json({"status":200, "data": list});
      } else {
        res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
      }
    }).catch(function(err) {
      res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
    });
  },
  dispositifsListOneEntity: function(req, res) {
    const entityId = req.params.entityId

    models.Dispositifs.findAll({
      include: [
        { model: models.Entities,
          include: [
            { model: models.Entities_types },
            {  model: models.Stats },
            {  model: models.Floors },
            {  model: models.Buildings }
          ],
        },
        {  model: models.Dispositifs_types },
        {  model: models.That_dispositifs },
        {  model: models.Stats }
      ],
      where : {entityId : entityId, statId: {[Op.ne]:2}}
    }).then(function(list) {
      if (list.length) {
        res.status(200).json({"status":200, "data": list});
      } else {
        res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
      }
    }).catch(function(err) {
      res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
    });
  }
}
