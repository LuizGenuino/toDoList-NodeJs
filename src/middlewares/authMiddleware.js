const { UnauthorizedError, NotFoundError } = require("../helpers/ApiError")
const jwt = require('jsonwebtoken')
const User = require("../models/User")

module.exports = {
    async authMiddleware(req, res, next) {
        try {
            const { authorization } = req.headers

            if (!authorization) {
                return next(new UnauthorizedError('Não Autorizado!'))
                //throw new UnauthorizedError('Não Autorizado!')
            }

            const token = authorization.split(' ')[1]

            const { id } = jwt.verify(token, process.env.JWT_PASSWORD ?? '')

            const user = await User.findByPk(id,{
                include: {association: 'tasks',  include: { association: 'categories', attributes: ['id','name', 'icon'], through: { attributes: [] } }}
            })


            if (!user) {
                return next(new NotFoundError('Usuario não Encontrado'))
                // throw new UnauthorizedError('Não Autorizado!')
            }

            req.user = user

            next()
        } catch (error) {
            // Se ocorrer um erro na verificação do token, capture a exceção
            // e retorne uma resposta de erro personalizada
            return next(new UnauthorizedError('Token inválido'));
        }

    }
}