const { Model, DataTypes } = require('sequelize');

class Task extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING,
            subtitle: DataTypes.STRING,
            concluded: DataTypes.BOOLEAN,
            preference: DataTypes.INTEGER,
        }, {
            sequelize: connection,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'}); // 1 usuario - N tarefas
        this.belongsToMany(models.Category, {foreignKey: category_id, through: 'tasks_categories', as: 'categories'}) // N tarefas - N categorias
    }
}
module.exports = Task;