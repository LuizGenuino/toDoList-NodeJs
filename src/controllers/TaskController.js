const Tasks = require('../models/Tasks');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { user_id } = req.params;
        const { title, subtitle, concluded, preference } = req.body;

        const user = await User.findByPk(user_id, {
            include: {association: 'tasks'}
        })

        if(!user){
            return res.status(400).json({error: 'User Not Found'});
        }

        const tasks = await Tasks.create({title, subtitle, concluded, preference, user_id})

        return res.status(200).json(tasks)
    },

    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: {association: 'tasks'}
        })

        return res.status(200).json(user.tasks)
    }
}