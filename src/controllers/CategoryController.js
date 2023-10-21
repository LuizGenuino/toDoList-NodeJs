const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
    async create(req, res) {
        try {
            const { name, icon } = req.body;
            const nameLowerCase = name.toLowerCase()
            const [category] = await Category.findOrCreate({ // procure ou crie 
                where: { name: nameLowerCase },
                defaults: {
                    mame: nameLowerCase, icon
                }
            })
            return res.status(200).json(category)

            
        } catch (error) {
            console.log("\n\nerro: ", error);
        }

    },

    async list(req, res) {
        try {
            const categoryList = await Category.findAll();

            return res.status(200).json({
                data: categoryList
            })


        } catch (error) {
            console.log("\n\nerro: ", error);
        }

    },

    async update(req, res) {
        try {
            // apenas sudo pode editar
            return res.status(200).json({ update: false })


        } catch (error) {
            console.log("\n\nerro: ", error);
        }

    },

    async delete(req, res) {
        try {
            // apenas sudo pode deletar
            return res.status(200).json({ delete: false })


        } catch (error) {
            console.log("\n\nerro: ", error);
        }

    }
}