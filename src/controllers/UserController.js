const { BadRequestError } = require('../helpers/ApiError');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async create(req, res, next) {
        const { name, email, cellphone, cpf, birthday, password } = req.body;

        const userExists = await User.findOne({
            where: { email, cellphone }
        })

        if (userExists) {
            return next(new BadRequestError('Email ou Celular já Cadastrado!')); //o next passa a exeção para frente (onde a função é chamada) e continua o codigo
        }

        const hashPassword = await bcrypt.hash(password, 10) // 10 é o numero padrão de procressamento da senha

        const newUser = await User.create({ name, email, cellphone, cpf, birthday, password: hashPassword })

        const { password: _, ...user } = newUser.dataValues // estou passando pra constante 'user' todos os dados da 'newUser' menos a 'password'

        return res.status(201).json(user)
    },

    async list(req, res) {
        const users = await User.findAll()
        return res.status(200).json(users)
    },

}