'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Entities.belongsTo(models.Buildings, {foreignKey: 'buildingId'});
      models.Entities.belongsTo(models.Stats, {foreignKey: 'statId'});
      models.Entities.belongsTo(models.Floors, {foreignKey: 'floorId'});
      models.Entities.belongsTo(models.Entities_types, {foreignKey: 'entityTypeId'});

      models.Entities.hasMany(models.Dispositifs, {foreignKey: 'dispositifId'});
    }
  };
  Entities.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Entities',
  });
  return Entities;
};