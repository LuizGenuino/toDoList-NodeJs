const express = require('express')
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

const routes = express.Router()

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/tasks/:user_id', TaskController.store)
routes.get('/tasks/:user_id', TaskController.index);

module.exports = routes