'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Floors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Floors.hasMany(models.Entities, {foreignKey: 'floorId'});

    }
  };
  Floors.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Floors',
  });
  return Floors;
};