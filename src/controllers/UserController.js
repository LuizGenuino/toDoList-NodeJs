const { BadRequestError, NotFoundError } = require('../helpers/ApiError');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async create(req, res, next) {
        const { name, email, cellphone, cpf, birthday, password } = req.body;

        const userExists = await User.findOne({
            where: { email, cellphone, cpf }
        })

        if (userExists) {
            return next(new BadRequestError('CPF, Email ou Celular já Cadastrado!')); //o next passa a exeção para frente (onde a função é chamada) e continua o codigo
        }

        const hashPassword = await bcrypt.hash(password, 10) // 10 é o numero padrão de procressamento da senha

        const newUser = await User.create({ name, email, cellphone, cpf, birthday, password: hashPassword })

        const { password: _, ...user } = newUser.dataValues // estou passando pra constante 'user' todos os dados da 'newUser' menos a 'password'

        return res.status(201).json(user)
    },

    async update(req, res, next) {
        const editUser = req.body

        const [rowsAffected, [updatedUser]] = await User.update(
            { ...editUser },
            {
                where: {
                    id: req.user.id
                },
                returning: true //sem isso a função retorna 0 ou 1. Com o returning ela retorna quantidade linhas afetadas e os dados atualizados
            }
        );

        if (rowsAffected === 0) {
            // Isso significa que nenhum registro foi atualizado, o que pode ocorrer se o ID não existir na tabela
            return next(new NotFoundError('Usuário não encontrado'));
        }

        // O registro atualizado é armazenado em 'updatedUser'
        return res.status(200).json(updatedUser);

    },

    async delete(req, res, next) {
        const deleteUser = await User.destroy({ 
            where: { id: req.user.id }          
        })
        
        return res.status(200).json({deleted: true})
    },

    //operações futuras do sudo
    async list(req, res) {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // exclui a coluna password dos dados dos usuarios
        });

        return res.status(200).json(users)
    },

}