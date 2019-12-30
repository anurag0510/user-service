const Sequelize = require('sequelize');
const { Op, EmptyResultError, UniqueConstraintError } = require('sequelize');
const uuid = require('uuid');
const { SQLError } = require('common-errors').data;
const { HttpStatusError } = require('common-errors');

const Crypto = require('crypto');

const { User } = require('../../../models/sequelize');

class UserDal {
    async getUsers(filter, filterValue, additionalFilterValue, all) {
        let whereClause = {};
        if (!all) whereClause['is_deleted'] = false;
        if (filter === 'first_name' || filter === 'last_name')
            whereClause[filter] = { [Op.like]: `%${filterValue}%` }
        else if (filter !== undefined) whereClause[filter] = filterValue;
        if (filter === 'mobile_number')
            whereClause['country_code'] = additionalFilterValue;
        const result = await User.findAll({
            attributes: ['user_name', 'first_name', 'last_name',
                'email_address', 'country_code', 'mobile_number', 'address',
                'country', 'city', 'is_active', 'is_deleted'],
            where: whereClause
        });
        return result;
    }

    async createUser(userInfo) {
        userInfo.salt = Crypto.createHash('md5')
            .update(uuid.v1() + new Date().getTime())
            .digest('hex');
        userInfo.password = Crypto.createHash('sha512')
            .update(userInfo.password + userInfo.salt)
            .digest('hex');
        try {
            let result = await User.create(userInfo);
            result = await this.getUsers('user_name', result.user_name);
            return result[0];
        }
        catch (error) {
            if (error instanceof UniqueConstraintError && 'user_name' in error.fields)
                throw new HttpStatusError(409, `User with user_name: ${userInfo.user_name} already exists.`);
            if (error instanceof UniqueConstraintError && 'mobile_number' in error.fields)
                throw new HttpStatusError(409, `User(s) with mobile_number: ${userInfo.mobile_number} already exist.`);
            if (error instanceof UniqueConstraintError && 'email_address' in error.fields)
                throw new HttpStatusError(409, `User(s) with email_address: ${userInfo.email_address} already exist.`);
        }
    }

    async updateUser(id, value, additionalValue, userInfo) {
        try {
            let userDetails = await this.getUsers(id, value, additionalValue);
            if (userInfo['mobile_number'] === userDetails[0]['mobile_number']) {
                delete userInfo['mobile_number'];
                delete userInfo['country_code'];
            }
            if (userInfo['email_address'] === userDetails[0]['email_address'])
                delete userInfo['email_address'];
            let whereClause = {};
            if (id === 'user_name' || id === 'email_address' || id === 'mobile_number') whereClause[id] = value;
            if (id === 'mobile_number') whereClause['country_code'] = additionalValue;
            whereClause['is_deleted'] = false;
            let result = await User.update(userInfo, {
                where: whereClause,
                rejectOnEmpty: true
            });
            result = await this.getUsers(id, value, additionalValue);
            return result[0];
        }
        catch (error) {
            console.log(error.fields);
            if (error instanceof UniqueConstraintError && 'mobile_number' in error.fields)
                throw new HttpStatusError(409, `User with mobile_number: ${userInfo.mobile_number} already exist.`);
            if (error instanceof UniqueConstraintError && 'email_address' in error.fields)
                throw new HttpStatusError(409, `User with email_address: ${userInfo.email_address} already exist.`);
        }
    }

    async deleteUser(id, value, additionalValue) {
        let userDetails = await this.getUsers(id, value, additionalValue, true);
        if (userDetails.length === 0)
            throw new HttpStatusError(404, `User doesn't exists.`);
        if (userDetails[0]['is_deleted'] === true)
            throw new HttpStatusError(400, `User already deleted.`);
        let userInfo = {
            is_deleted: true
        }
        let whereClause = {};
        if (id === 'user_name' || id === 'email_address' || id === 'mobile_number') whereClause[id] = value;
        if (id === 'mobile_number') whereClause['country_code'] = additionalValue;
        let result = await User.update(userInfo, {
            where: whereClause,
            rejectOnEmpty: true
        });
        result = await this.getUsers(id, value, additionalValue, true);
        return result[0];
    }

    async validateUserPassword(id, value, additionalValue, passwordInfo) {
        let whereClause = {};
        if (id === 'user_name' || id === 'email_address' || id === 'mobile_number') whereClause[id] = value;
        if (id === 'mobile_number') whereClause['country_code'] = additionalValue;
        let result = await User.findOne({
            where: whereClause,
            attributes: ['password', 'salt']
        });
        if (!result)
            throw new HttpStatusError(404, `No such user with ${id}: ${value} exists.`)
        let validationPassword = Crypto.createHash('sha512')
            .update(passwordInfo.password + result.salt)
            .digest('hex');
        if (validationPassword === result.password)
            return { message: 'Provided password is correct.' };
        else
            throw new HttpStatusError(401, `Failed to authorize user with ${id}: ${value}. Incorrect password.`)
    }

    async updatePassword(id, value, additionalValue, updatePasswordInfo) {
        let whereClause = {};
        if (id === 'user_name' || id === 'email_address' || id === 'mobile_number') whereClause[id] = value;
        if (id === 'mobile_number') whereClause['country_code'] = additionalValue;
        let result = await User.findOne({
            where: whereClause,
            attributes: ['password', 'salt']
        });
        if (!result)
            throw new HttpStatusError(404, `No such user with ${id}: ${value} exists.`)
        let validationPassword = Crypto.createHash('sha512')
            .update(updatePasswordInfo.current_password + result.salt)
            .digest('hex');
        if (validationPassword === result.password) {
            let newPassword = Crypto.createHash('sha512')
                .update(updatePasswordInfo.new_password + result.salt)
                .digest('hex');
            result = await User.update({ password: newPassword }, {
                where: whereClause
            });
            return { message: 'User password updated successfully.' }
        }
        else
            throw new HttpStatusError(401, `Failed to authorize user with ${id}: ${value}. Incorrect password.`)
    }

    async setPassword(id, value, additionalValue, setPasswordInfo) {
        let whereClause = {};
        if (id === 'user_name' || id === 'email_address' || id === 'mobile_number') whereClause[id] = value;
        if (id === 'mobile_number') whereClause['country_code'] = additionalValue;
        let result = await User.findOne({
            where: whereClause,
            attributes: ['password', 'salt']
        });
        if (!result)
            throw new HttpStatusError(404, `No such user with ${id}: ${value} exists.`)
        let newPassword = Crypto.createHash('sha512')
            .update(setPasswordInfo.new_password + result.salt)
            .digest('hex');
        result = await User.update({ password: newPassword }, {
            where: whereClause
        });
        return { message: 'User password updated successfully.' }
    }
}

module.exports = new UserDal();