const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Category = require('../models/Category')
const Task = require('../models/Task')

const connection = new Sequelize(dbConfig)

User.init(connection)
Task.init(connection)
Category.init(connection)

User.associate(connection.models)
Task.associate(connection.models)
Category.associate(connection.models)

module.exports = connection;