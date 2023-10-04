'use strict';

/** @type {import('sequelize').Sequelize } */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true // Torna o campo "email" único
      },
      cellphone: {
        type: Sequelize.STRING(13), // Limita a 13 caracteres
        allowNull: true,
        unique: true // Torna o campo "cellphone" único
      },
      cpf: {
        type: Sequelize.STRING(11), // Limita a 11 caracteres
        allowNull: true,
        unique: true // Torna o campo "cpf" único
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
