'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Presences.init({
    email: DataTypes.STRING,
    arrived_at: DataTypes.DATE,
    departure: DataTypes.DATE,
    vaccinated: DataTypes.BOOLEAN,
    level_vaccine: DataTypes.STRING,
    type: DataTypes.STRING,
    returned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Presences',
  });
  return Presences;
};