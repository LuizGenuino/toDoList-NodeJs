const express = require('express')
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController');
const CategoryController = require('./controllers/CategoryController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router()

routes.post('/users', UserController.create);
routes.get('/users', UserController.list);

routes.post('/tasks/:user_id', TaskController.create)
routes.get('/tasks/:user_id', TaskController.list);

routes.post('/categories/:task_id', CategoryController.create)
routes.get('/categories/:task_id', CategoryController.list);
routes.delete('/categories/:task_id', CategoryController.delete);

routes.get('/report', ReportController.show)

module.exports = routes