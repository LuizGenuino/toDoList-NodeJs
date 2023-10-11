const express = require('express')
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController');
const CategoryController = require('./controllers/CategoryController');
const ReportController = require('./controllers/ReportController');
const { authMiddleware } = require('./middlewares/authMiddleware');

const routes = express.Router()

routes.post('/users', UserController.create);
routes.post('/login', UserController.login);

routes.use(authMiddleware) // significa que todas as rotas abaixo utilizaram o authMiddleware
// uma alternativa para não colocar em cada uma das rotas. EX: routes.get('/users', authMiddleware, UserController.list);

routes.get('/users', UserController.list);


routes.post('/tasks', TaskController.create)
routes.get('/tasks', TaskController.list);

routes.post('/categories/:task_id', CategoryController.create)
routes.get('/categories/:task_id', CategoryController.list);
routes.delete('/categories/:task_id', CategoryController.delete);

module.exports = routes