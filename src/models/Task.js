const { Model, DataTypes } = require('sequelize');

class Task extends Model {
    static init(connection) {
        super.init(
            {
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                subtitle: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                concluded: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                preference: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 3,
                },
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        }); // 1 usuário - N tarefas

        this.belongsToMany(models.Category, {
            through: 'tasks_categories',
            foreignKey: 'task_id',
            as: 'categories',
        }); // N tarefas - N categorias
    }
}

module.exports = Task;
