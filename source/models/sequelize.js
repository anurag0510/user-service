const Sequelize = require('sequelize');

const sequelize = new Sequelize('user_service', 'root', 'anurag0510', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;