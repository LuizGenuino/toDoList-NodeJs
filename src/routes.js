const express = require('express')
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController');
const CategoryController = require('./controllers/CategoryController');
const { authMiddleware } = require('./middlewares/authMiddleware');
const LoginController = require('./controllers/LoginController');
const { userMiddleware } = require('./middlewares/userMiddleware');
const { TaskMiddleware } = require('./middlewares/taskMiddleware');
const { CategoryMiddleware } = require('./middlewares/categoryMiddleware');


const routes = express.Router()

routes.post('/login', LoginController.login);


routes.post('/user', userMiddleware, UserController.create);

routes.use(authMiddleware) // significa que todas as rotas abaixo utilizaram o authMiddleware
// uma alternativa para não colocar em cada uma das rotas. EX: routes.get('/users', authMiddleware, UserController.list);
routes.get('/user', UserController.list);
routes.put('/user/:user_id', userMiddleware, UserController.update);
routes.delete('/user/:user_id', UserController.delete);


routes.get('/task', TaskController.list);
routes.post('/task', TaskMiddleware, TaskController.create)
routes.put('/task/:task_id', TaskMiddleware, TaskController.update)
routes.delete('/task/:task_id', TaskMiddleware, TaskController.delete)


routes.post('/category', CategoryMiddleware, CategoryController.create)
routes.put('/category/:category_id', CategoryMiddleware, CategoryController.update)
routes.get('/category', CategoryController.list);
routes.delete('/category/:category_id', CategoryController.delete);

module.exports = routes