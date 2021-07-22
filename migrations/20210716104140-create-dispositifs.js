'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dispositifs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Stats',
          key: 'id'
        }
      },
      entityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Entities',
          key: 'id'
        }
      },
      dispositifTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Dispositifs_types',
          key: 'id'
        }
      },
      thatId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'That_dispositifs',
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      temp: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Dispositifs');
  }
};