module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'todolist',
    define: {
        timestamps: true,
        underscored: true,
    }
}