const User = require('../models/User')

module.exports = {
    async create(req, res) {
        const { name, email, cellphone, birthday, password } = req.body;

        const user = await User.create({ name, email, cellphone, birthday, password })
        return res.status(200).json(user)
    },

    async list(req, res) {
        const users = await User.findAll()
        return res.status(200).json(users)
    }
}