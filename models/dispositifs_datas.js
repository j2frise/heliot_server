'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dispositifs_datas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Dispositifs_datas.belongsTo(models.Dispositifs, {foreignKey: 'dispositifId'});
    }
  };
  Dispositifs_datas.init({
    data: DataTypes.STRING,
    date_register: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Dispositifs_datas',
  });
  return Dispositifs_datas;
};