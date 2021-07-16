'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class That_dispositifs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.That_dispositifs.hasMany(models.Dispositifs, {foreignKey: 'thatId'});

    }
  };
  That_dispositifs.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'That_dispositifs',
  });
  return That_dispositifs;
};