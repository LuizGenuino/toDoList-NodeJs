const { Op } = require('sequelize');
const { BadRequestError, NotFoundError } = require('../helpers/ApiError');
const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async create(req, res, next) {
        try {
            const { name, email, cellphone, cpf, birthday, password } = req.body;

            const userExists = await User.findOne({
                where: { [Op.or]: [{ email }, { cellphone }, { cpf }] }
            })

            if (userExists) {
                return next(new BadRequestError('CPF, Email ou Celular já Cadastrado!')); //o next passa a exeção para frente (onde a função é chamada) e continua o codigo
            }

            const hashPassword = await bcrypt.hash(password, 10) // 10 é o numero padrão de procressamento da senha

            const newUser = await User.create({ name, email, cellphone, cpf, birthday, password: hashPassword })

            const { password: _, ...user } = newUser.dataValues // estou passando pra constante 'user' todos os dados da 'newUser' menos a 'password'

            return res.status(201).json(user)


        } catch (error) {
            console.log("erro: ", error);
        }

    },

    async update(req, res, next) {
        try {
            const { user_id } = req.params;
            const editUser = req.body

            if(+user_id !== req.user.id){
                return next(new NotFoundError('Usuário não encontrado'));
            }
            const [rowsAffected, [updatedUser]] = await User.update(
                { ...editUser },
                {
                    where: {
                        id: user_id
                    },
                    returning: true //sem isso a função retorna 0 ou 1. Com o returning ela retorna quantidade linhas afetadas e os dados atualizados
                }
            );

            if (rowsAffected === 0) {
                // Isso significa que nenhum registro foi atualizado, o que pode ocorrer se o ID não existir na tabela
                return next(new NotFoundError('Usuário não encontrado'));
            }

            const { password: _, ...userWithoutPass } = updatedUser.dataValues // estou passando pra constante  todos os dados da 'updatedUser' menos a 'password'

            return res.status(200).json(userWithoutPass);


        } catch (error) {
            console.log("erro: ", error);
        }

    },

    async delete(req, res, next) {
        try {
            const { user_id } = req.params;

            if(+user_id !== req.user.id){
                return next(new NotFoundError('Usuário não encontrado'));
            }

            const deleteUser = await User.destroy({
                where: { id: user_id }
            })

            return res.status(200).json({ deleted: true })


        } catch (error) {
            console.log("erro: ", error);
        }

    },

    //operações futuras do sudo
    async list(req, res) {
        try {
            // const users = await User.findAll({
            //     attributes: { exclude: ['password'] } // exclui a coluna password dos dados dos usuarios
            // });

            return res.status(200).json([])


        } catch (error) {
            console.log("erro: ", error);
        }

    },

}