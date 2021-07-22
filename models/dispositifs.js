'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dispositifs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Dispositifs.belongsTo(models.Entities, {foreignKey: 'entityId'});
      models.Dispositifs.belongsTo(models.Stats, {foreignKey: 'statId'});
      models.Dispositifs.belongsTo(models.Dispositifs_types, {foreignKey: 'dispositifsTypeId'});
      models.Dispositifs.belongsTo(models.That_dispositifs, {foreignKey: 'thatId'});

      models.Dispositifs.hasMany(models.Dispositifs_datas, {foreignKey: 'dispositifId'});
    }
  };
  Dispositifs.init({
    name: DataTypes.STRING,
    temp: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Dispositifs',
  });
  return Dispositifs;
};