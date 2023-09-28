const { Model, DataTypes } = require('sequelize');

class Tasks extends Model {
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
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    }
}
module.exports = Tasks;