const express = require('express')
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController');
const CategoryController = require('./controllers/CategoryController');

const routes = express.Router()

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/tasks/:user_id', TaskController.store)
routes.get('/tasks/:user_id', TaskController.index);

routes.post('/categories/:task_id', CategoryController.store)
routes.get('/categories/:task_id', CategoryController.index);
routes.delete('/categories/:task_id', CategoryController.delete);

module.exports = routes