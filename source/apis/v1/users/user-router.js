const express = require('express');


const UserController = require('./user-controller')

const router = express.Router();

// Get all users
router.get('/', (request, response) => {
    UserController._getUsers(request, response);
});

// Get users based on there first_name, last_name, email_address, user_name
router.get('/:filter(first_name|last_name|email_address|user_name)/:filter_value', (request, response) => {
    UserController._getUsers(request, response);
});

// Get users based on mobile_number and country_code combination
router.get('/:filter(mobile_number)/:additional_filter_value(\\d+)/:filter_value(\\d+)', (request, response) => {
    UserController._getUsers(request, response);
});

// Create User
router.post('/', (request, response) => {
    UserController._createUser(request, response);
})

// Update user based on user_name, email_address
router.put('/:id(user_name|email_address)/:value', (request, response) => {
    UserController._updateUser(request, response);
});

// Update user based on mobile_number and country_code combination
router.put('/:id(mobile_number)/:additional_value(\\d+)/:value(\\d+)', (request, response) => {
    UserController._updateUser(request, response);
});

// Delete user based on user_name, email_address
router.delete('/:id(user_name|email_address)/:value', (request, response) => {
    UserController._deleteUser(request, response);
});

// Delete user based on mobile_number and country_code combination
router.delete('/:id(mobile_number)/:additional_value(\\d+)/:value(\\d+)', (request, response) => {
    UserController._deleteUser(request, response);
});

// Validate user password based on user_name, email_address
router.post('/:id(user_name|email_address)/:value/validate_password', (request, response) => {
    UserController._validatePassword(request, response);
});

// Validate user password based on mobile_number and country_code combination
router.post('/:id(mobile_number)/:additional_value(\\d+)/:value(\\d+)/validate_password', (request, response) => {
    UserController._validatePassword(request, response);
});

// Update user password based on user_name, email_address
router.post('/:id(user_name|email_address)/:value/update_password', (request, response) => {
    UserController._updatePassword(request, response);
});

// Update user password based on mobile_number and country_code combination
router.post('/:id(mobile_number)/:additional_value(\\d+)/:value(\\d+)/update_password', (request, response) => {
    UserController._updatePassword(request, response);
});

// Set(Hard Reset) user password based on user_name, email_address
router.post('/:id(user_name|email_address)/:value/set_password', (request, response) => {
    UserController._setPassword(request, response);
});

// Set(Hard Reset) user password based on mobile_number and country_code combination
router.post('/:id(mobile_number)/:additional_value(\\d+)/:value(\\d+)/set_password', (request, response) => {
    UserController._setPassword(request, response);
});

module.exports = router;