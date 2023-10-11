const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Torna o campo "email" único
            },
            cellphone: {
                type: DataTypes.STRING(13), // Limita a 13 caracteres
                allowNull: false,
                unique: true, // Torna o campo "cellphone" único
            },
            cpf: {
                type: DataTypes.STRING(11), // Limita a 11 caracteres
                allowNull: false,
                unique: true, // Torna o campo "cpf" único
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize: connection,
        })
    }

    static associate(models) {
        this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });  // 1 usuário - N tarefas
    }
}

module.exports = User;
