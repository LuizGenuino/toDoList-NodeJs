const Task = require('../models/Task');
const User = require('../models/User');


module.exports = {
    async create(req, res) {
        const { title, subtitle, concluded, preference } = req.body;

        const tasks = await Task.create({title, subtitle, concluded, preference, user_id: req.user.id})

        return res.status(200).json(tasks)
    },

    async list(req, res, next) {
        // como a função de validação do token no "authMiddleware" ja retornar os dados que precisamos apenas retornamos os dados aqui
        return res.status(200).json(req.user.tasks)
    }
}