const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            cellphone: DataTypes.STRING,
            birthday: DataTypes.DATE,
            password: DataTypes.STRING
        }, {
            sequelize: connection,
        })
    }

    static associate(models) {
        this.hasMany(models.Tasks, {foreignKey: 'user_id', as: 'tasks'});  // 1 usuario - N tarefas
    }
}
module.exports = User;