const { NotFoundError } = require('../helpers/ApiError');
const Task = require('../models/Task');


module.exports = {
    async create(req, res, next) {
        try {
            const { title, subtitle, concluded, preference, categories } = req.body;

            const task = await Task.create({ title, subtitle, concluded, preference, user_id: req.user.id });

            if (task) {

                await task.addCategories(categories);
                // Agora, recarregue a tarefa com as categorias associadas antes de retorná-la
                const taskWithCategories = await Task.findByPk(task.id, {
                    include: {
                        association: 'categories',
                        attributes: ['id', 'name', 'icon'],
                        through: { attributes: [] }
                    }
                });

                return res.status(200).json(taskWithCategories);
            } else {
                return next(new NotFoundError('Tarefa não encontrada'));
            }

            
        } catch (error) {
            console.log("erro: ", error);
        }
    },

    async list(req, res, next) {
        try {
            // como a função de validação do token no "authMiddleware" ja retornar os dados que precisamos apenas retornamos os dados aqui
            return res.status(200).json(req.user.tasks)


        } catch (error) {
            console.log("erro: ", error);
        }
    },

    async update(req, res, next) {
        try {
            const { task_id } = req.params;
            const editTask = req.body

            const [rowsAffected, [updatedTask]] = await Task.update(
                { ...editTask },
                {
                    where: {
                        id: task_id
                    },
                    returning: true //sem isso a função retorna 0 ou 1. Com o returning ela retorna quantidade linhas afetadas e os dados atualizados
                }
            );

            if (rowsAffected === 0) {
                // Isso significa que nenhum registro foi atualizado, o que pode ocorrer se o ID não existir na tabela
                return next(new NotFoundError('Tarefa não encontrada'));
            }
            if (editTask.categories !== undefined && editTask.categories.length > 0) {
                await updatedTask.setCategories(editTask.categories)
            }

            const taskWithCategories = await Task.findByPk(updatedTask.id, {
                include: {
                    association: 'categories',
                    attributes: ['id', 'name', 'icon'],
                    through: { attributes: [] }
                }
            });

            return res.status(200).json(taskWithCategories);


        } catch (error) {
            console.log("erro: ", error);
        }

    },

    async delete(req, res, next) {
        try {
            const { task_id } = req.params;

            const deleteTask = await Task.destroy({
                where: { id: task_id }
            })

            if (!deleteTask) {
                return res.status(404).json({ deleted: false })
            }
            return res.status(200).json({ deleted: true })


        } catch (error) {
            console.log("erro: ", error);
        }

    }
}