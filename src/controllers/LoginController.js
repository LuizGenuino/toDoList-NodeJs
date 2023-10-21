const { BadRequestError } = require('../helpers/ApiError');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email }
            })

            if (!user) {
                return next(new BadRequestError('Email não Cadastrado!'));//o next passa a exeção para frente (onde a função é chamada) e continua o codigo
            }


            const verifyPassword = await bcrypt.compare(password, user.password)

            if (!verifyPassword) {
                return next(new BadRequestError('Senha Incorreta'));//o next passa a exeção para frente (onde a função é chamada) e continua o codigo
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD ?? '', { expiresIn: '1d' })

            const { password: _, ...userWithoutPass } = user.dataValues // estou passando pra constante 'user' todos os dados da 'newUser' menos a 'password'

            return res.status(200).json({
                user: userWithoutPass,
                token: 'Bearer ' + token
            })

            
        } catch (error) {
            console.log("\n\nerror: ", error);
        }

    },

}