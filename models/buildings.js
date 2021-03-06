'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buildings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Buildings.hasMany(models.Entities, {foreignKey: 'buildingId'});

    }
  };
  Buildings.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Buildings',
  });
  return Buildings;
};