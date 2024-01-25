const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize: connection,
            tableName: 'categories',
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user',}); // 1 usuário - N tarefas

        this.belongsToMany(models.Task, { foreignKey: 'category_id', through: 'tasks_categories', as: 'tasks' })  // N tarefas - N categorias
    }
}
module.exports = Category;