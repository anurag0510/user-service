const HttpStatusError = require('common-errors').HttpStatusError;

const UserService = require('./user-service');
const UserValidation = require('./user-validation');

class UserController {
    async _getUsers(request, response) {
        try {
            const result = await UserService.getUsers(
                request.params.filter,
                request.params.filter_value,
                request.params.additional_filter_value,
                'all' in request.query
            );
            response.json({ success: true, data: result })
        }
        catch (ex) {
            console.log(ex);
            response.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async _createUser(request, response) {
        let payload = request.body;
        try {
            const payloadValidation = await UserValidation.validateCreateUserData(payload);
            if (!payloadValidation.error) {
                const result = await UserService.createUser(payload);
                response.status(201).json(result);
            }
            else
                response.status(400).json({
                    status: 400, message: payloadValidation.error.details.map(value => { return value.message; })
                });
        }
        catch (error) {
            response.status(error.statusCode).json({ message: error.message })
        }
    }

    async _updateUser(request, response) {
        let payload = request.body;
        try {
            const payloadValidation = await UserValidation.validateUpdateUserData(payload);
            if (!payloadValidation.error) {
                const result = await UserService.updateUser(
                    request.params.id,
                    request.params.value,
                    request.params.additional_value,
                    payload);
                response.json(result);
            }
            else
                response.status(400).json({
                    status: 400, message: payloadValidation.error.details.map(value => { return value.message; })
                });
        }
        catch (error) {
            response.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async _deleteUser(request, response) {
        try {
            const result = await UserService.deleteUser(
                request.params.id,
                request.params.value,
                request.params.additional_value
            );
            response.json(result);
        }
        catch (error) {
            response.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async _validatePassword(request, response) {
        try {
            let payload = request.body;
            const payloadValidation = await UserValidation.validatePasswordUserData(payload);
            if (!payloadValidation.error) {
                const result = await UserService.validateUserPassword(
                    request.params.id,
                    request.params.value,
                    request.params.additional_value,
                    payload);
                response.json(result);
            }
            else
                response.status(400).json({
                    status: 400, message: payloadValidation.error.details.map(value => { return value.message; })
                });
        }
        catch (error) {
            response.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async _updatePassword(request, response) {
        try {
            let payload = request.body;
            const payloadValidation = await UserValidation.validateUpdatePasswordUserData(payload);
            if (!payloadValidation.error) {
                const result = await UserService.updatePassword(
                    request.params.id,
                    request.params.value,
                    request.params.additional_value,
                    payload);
                response.json(result);
            }
            else
                response.status(400).json({
                    status: 400, message: payloadValidation.error.details.map(value => { return value.message; })
                });
        }
        catch (error) {
            response.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async _setPassword(request, response) {
        try {
            let payload = request.body;
            const payloadValidation = await UserValidation.validateSetPasswordUserData(payload);
            if (!payloadValidation.error) {
                const result = await UserService.setPassword(
                    request.params.id,
                    request.params.value,
                    request.params.additional_value,
                    payload);
                response.json(result);
            }
            else
                response.status(400).json({
                    status: 400, message: payloadValidation.error.details.map(value => { return value.message; })
                });
        }
        catch (error) {
            response.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

module.exports = new UserController()