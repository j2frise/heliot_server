'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dispositifs_datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dispositifId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Dispositifs',
          key: 'id'
        }
      },
      data: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_register: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Dispositifs_datas');
  }
};