const Sequelize = require('sequelize');

const sequelize = require('./sequelize');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
    user_name: {
        type: Sequelize.STRING,
        unique: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email_address: {
        isEmail: true,
        type: Sequelize.STRING,
        unique: true
    },
    country_code: Sequelize.STRING,
    mobile_number: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    address: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    country: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    city: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    created_at: {
        type: Sequelize.DATE
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
},
    {
        timestamps: false
    });

module.exports = User;