'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entities_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Entities_types.hasMany(models.Entities, {foreignKey: 'entityTypeId'});

    }
  };
  Entities_types.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entities_types',
  });
  return Entities_types;
};