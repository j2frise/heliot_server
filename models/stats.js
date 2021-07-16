'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Stats.hasMany(models.Entities, {foreignKey: 'statId'});
      models.Stats.hasMany(models.Dispositifs, {foreignKey: 'statId'});
    }
  };
  Stats.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stats',
  });
  return Stats;
};