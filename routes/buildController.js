//imports
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");
var moment  = require('moment');

//Routes
module.exports = {
  test: function(req, res) {
      res.status(200).json({"status":200, "response": "youpi mon cul"});
  },
  dispositifsDataList: function(req, res) {
    const dateVal = req.params.date
    models.Dispositifs_datas.findAll({
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
        {  model: models.Buildings }
      ],
      where: {date_register: dateVal}
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
  entitiesList: function(req, res) {
    models.Entities.findAll({
      include: [
        { model: models.Entities_types },
        {  model: models.Stats },
        {  model: models.Floors },
        {  model: models.Buildings }
      ],
      where: { staId: {[Op.ne]:2} }
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
  buildingsList: function(req, res) {
    models.Buildings.findAll({
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
  floorsList: function(req, res) {
    models.Floors.findAll({
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
