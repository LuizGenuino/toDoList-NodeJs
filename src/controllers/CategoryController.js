const Category = require('../models/Category');

module.exports = {
    async create(req, res) {
        try {
            const { name, icon } = req.body;
            const nameLowerCase = name.toLowerCase()
            const [category] = await Category.findOrCreate({ // procure ou crie 
                where: { name: nameLowerCase, user_id: req.user.id },
                defaults: {
                    mame: nameLowerCase, icon, user_id: req.user.id 
                }
            })
            return res.status(200).json(category)

            
        } catch (error) {
            console.log("erro: ", error);
        }

    },

    async list(req, res) {
        try {
            // como a função de validação do token no "authMiddleware" ja retornar os dados que precisamos apenas retornamos os dados aqui
            return res.status(200).json(req.user.categories)


        } catch (error) {
            console.log("erro: ", error);
        }
    },

    async update(req, res) {
        try {
            const { category_id } = req.params;
            const editCategory = req.body

            const [rowsAffected, [updatedCategory]] = await Category.update(
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

            return res.status(200).json(updatedCategory);


        } catch (error) {
            console.log("erro: ", error);
        }


    },

    async delete(req, res) {
        try {
            const { category_id } = req.params;

            const deleteCategory = await Category.destroy({
                where: { id: category_id }
            })

            if (!deleteCategory) {
                return res.status(404).json({ deleted: false })
            }
            return res.status(200).json({ deleted: true })


        } catch (error) {
            console.log("erro: ", error);
        }

    }
}