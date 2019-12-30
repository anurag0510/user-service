const Joi = require('@hapi/joi');

const userParamKeys = {
    user_name: Joi.string().min(5).max(30),
    first_name: Joi.string().min(3).max(128),
    last_name: Joi.string().min(3).max(128),
    email_address: Joi.string().email(),
    country_code: Joi.string().valid('91'),
    mobile_number: Joi.string().length(10),
    password: Joi.string().min(8).max(32),
    address: Joi.string().min(10).max(255),
    country: Joi.string().min(2).max(100),
    city: Joi.string().min(2).max(100)
};

class UserValidation {
    async validateCreateUserData(payload) {
        const schema = Joi.object({
            user_name: userParamKeys.user_name.required(),
            first_name: userParamKeys.first_name.required(),
            last_name: userParamKeys.last_name.required(),
            email_address: userParamKeys.email_address.required(),
            country_code: userParamKeys.country_code.required(),
            mobile_number: userParamKeys.mobile_number.required(),
            password: userParamKeys.password.required(),
            address: userParamKeys.address,
            country: userParamKeys.country,
            city: userParamKeys.city
        })
            .options({ abortEarly: false });
        let result = await schema.validate(payload);
        return result;
    }

    async validateUpdateUserData(payload) {
        const schema = Joi.object({
            first_name: userParamKeys.first_name,
            last_name: userParamKeys.last_name,
            email_address: userParamKeys.email_address,
            country_code: userParamKeys.country_code,
            mobile_number: userParamKeys.mobile_number,
            address: userParamKeys.address,
            country: userParamKeys.country,
            city: userParamKeys.city
        })
            .with('mobile_number', 'country_code')
            .with('country_code', 'mobile_number')
            .options({ abortEarly: false });
        let result = await schema.validate(payload);
        return result;
    }

    async validatePasswordUserData(payload) {
        const schema = Joi.object({
            password: userParamKeys.password.required()
        });
        let result = await schema.validate(payload);
        return result;
    }

    async validateUpdatePasswordUserData(payload) {
        const schema = Joi.object({
            current_password: userParamKeys.password.required(),
            new_password: userParamKeys.password.required()
        })
            .options({ abortEarly: false });
        let result = await schema.validate(payload);
        return result;
    }

    async validateSetPasswordUserData(payload) {
        const schema = Joi.object({
            new_password: userParamKeys.password.required()
        });
        let result = await schema.validate(payload);
        return result;
    }
}

module.exports = new UserValidation();