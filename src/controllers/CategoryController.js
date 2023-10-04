const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
    async store(req, res) {
        const { task_id } = req.params;
        const { name, icon } = req.body;

        const task = await Task.findByPk(task_id);

        if (!task) {
            return res.status(400).json({ error: 'Task Not Found' })
        }

        const [category] = await Category.findOrCreate({ // procure ou crie 
            where: { name, icon }
        })

        await task.addCategory(category)

        return res.status(200).json(category)
    },

    async index(req, res) {
        const { task_id } = req.params;
        const task = await Task.findByPk(task_id, {
            include: { association: 'categories', attributes: ['name', 'icon'], through: { attributes: [] } }
        });
        return res.status(200).json(task)

    },

    async delete(req, res) {
        const { task_id } = req.params;
        const { name } = req.body;

        const task = await Task.findByPk(task_id);

        if (!task) {
            return res.status(400).json({ error: 'Task Not Found' })
        }

        const category = await Category.findOne({
            where: { name }
        })

        await task.removeCategory(category)

        return res.status(200).json()
    }
}