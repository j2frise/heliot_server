//imports
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");
var moment  = require('moment');

//Routes
module.exports = {
  statusList: function(req, res) {
    models.Stats.findAll({
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
  thatDispositifsList: function(req, res) {
    models.That_dispositifs.findAll({
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
  dispositifsTypesList: function(req, res) {
    models.Dispositifs_types.findAll({
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
  entitiesTypesList: function(req, res) {
    models.Entities_types.findAll({
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
}
