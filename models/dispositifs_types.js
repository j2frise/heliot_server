'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dispositifs_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Dispositifs_types.hasMany(models.Dispositifs, {foreignKey: 'dispositifTypeId'});
    }
  };
  Dispositifs_types.init({
    name: DataTypes.STRING,
    min: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    temp: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Dispositifs_types',
  });
  return Dispositifs_types;
};