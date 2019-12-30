const UserDal = require('./user-dal');
const { HttpStatusError } = require('common-errors');

class UserService {
    async getUsers(filter, filterValue, additionalFilterValue, all) {
        let result = await UserDal.getUsers(
            filter,
            filterValue,
            additionalFilterValue,
            all
        );
        return result;
    }

    async createUser(userInfo) {
        const userResponse = await UserDal.createUser(userInfo);
        return userResponse;
    }

    async updateUser(id, value, additionalValue, userInfo) {
        let result = await UserDal.updateUser(id, value, additionalValue, userInfo);
        return result;
    }

    async deleteUser(id, value, additionalValue) {
        let result = await UserDal.deleteUser(id, value, additionalValue);
        return result;
    }

    async validateUserPassword(id, value, additionalValue, passwordInfo) {
        let result = await UserDal.validateUserPassword(id, value, additionalValue, passwordInfo);
        return result;
    }

    async updatePassword(id, value, additionalValue, updatePasswordInfo) {
        let result = await UserDal.updatePassword(id, value, additionalValue, updatePasswordInfo);
        return result;
    }

    async setPassword(id, value, additionalValue, setPasswordInfo) {
        let result = await UserDal.setPassword(id, value, additionalValue, setPasswordInfo);
        return result;
    }
}

module.exports = new UserService()