const Sequelize = require('sequelize');

module.exports = (sequelize, DataType) => {
    return sequelize.define('user', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        user_name: {
            type: DataType.STRING,
            unique: true
        },
        first_name: DataType.STRING,
        last_name: DataType.STRING,
        email_address: {
            isEmail: true,
            type: DataType.STRING,
            unique: true
        },
        country_code: DataType.STRING,
        mobile_number: {
            type: DataType.STRING,
            unique: true
        },
        password: DataType.STRING,
        salt: DataType.STRING,
        address: {
            type: DataType.STRING,
            defaultValue: null
        },
        country: {
            type: DataType.STRING,
            defaultValue: null
        },
        city: {
            type: DataType.STRING,
            defaultValue: null
        },
        created_at: {
            type: DataType.DATE
        },
        updated_at: {
            type: DataType.DATE,
            defaultValue: DataType.NOW
        },
        is_active: {
            type: DataType.BOOLEAN,
            defaultValue: true
        },
        is_deleted: {
            type: DataType.BOOLEAN,
            defaultValue: false
        }
    },
        {
            timestamps: false
        });
}