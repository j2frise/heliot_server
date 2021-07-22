//imports
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");
var moment  = require('moment');

//Routes
module.exports = {
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
        {  model: models.Buildings }
      ],
      where: { staId: {[Op.ne]:2} }
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
        {  model: models.Buildings }
      ],
      where : {entityId : entityId, staId: {[Op.ne]:2}}
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
