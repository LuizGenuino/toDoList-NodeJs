const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            icon: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'categories',
        })
    }

    static associate(models) {
        this.belongsToMany(models.Task, {foreignKey: 'task_id', through: 'tasks_categories', as: 'tasks'})  // N tarefas - N categorias
    }
}
module.exports = Category;