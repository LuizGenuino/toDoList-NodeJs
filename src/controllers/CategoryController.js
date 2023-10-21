const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
    async create(req, res) {
        const { name, icon } = req.body;
        const nameLowerCase = name.toLowerCase()
        const [category] = await Category.findOrCreate({ // procure ou crie 
            where: { name: nameLowerCase },
            defaults: {
                mame: nameLowerCase, icon
            }
        })

        return res.status(200).json(category)
    },

    async list(req, res) {
        const categoryList = await Category.findAll();

        return res.status(200).json({
            data: categoryList
        })
    },

    async update(req, res) {
        // apenas sudo pode editar
        return res.status(200).json({update: false})
    },

    async delete(req, res) {
        // apenas sudo pode deletar
        return res.status(200).json({delete: false})
    }
}