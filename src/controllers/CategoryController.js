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
            const { category_id } = req.params;
            const editCategory = req.body

            const [rowsAffected, [updatedTask]] = await Category.update(
                { ...editCategory },
                {
                    where: {
                        id: category_id
                    },
                    returning: true //sem isso a função retorna 0 ou 1. Com o returning ela retorna quantidade linhas afetadas e os dados atualizados
                }
            );

            if (rowsAffected === 0) {
                // Isso significa que nenhum registro foi atualizado, o que pode ocorrer se o ID não existir na tabela
                return next(new NotFoundError('Categoria não encontrada'));
            }

            return res.status(200).json(updatedTask);


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