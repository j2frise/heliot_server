'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entityTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Entities_types',
          key: 'id'
        }
      },
      statId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Stats',
          key: 'id'
        }
      },
      floorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Floors',
          key: 'id'
        }
      },
      buildingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Buildings',
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nodeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image: {
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
    await queryInterface.dropTable('Entities');
  }
};