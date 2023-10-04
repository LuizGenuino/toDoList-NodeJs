const { Op } = require("sequelize")
const User = require("../models/User")

module.exports = {
    async show(req, res){
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%gmail.com'
                }
            },
            include: [
                { association: 'tasks', where: {title: 'Ir ao Mercado'}, attributes: ['title', 'subtitle'] }
            ]
        })

        return res.json(users)
    }
}