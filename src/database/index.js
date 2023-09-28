const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Tasks = require('../models/Tasks')

const connection = new Sequelize(dbConfig)

User.init(connection)
Tasks.init(connection)

User.associate(connection.models)
Tasks.associate(connection.models)

module.exports = connection;