const { errorResponse } = require('../../utils');
const autoBind = require('auto-bind');

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postUserHandler(request, h) {
        try {
            this._validator.validateUserPayload(request.payload);

            const { username, password, fullname } = request.payload;
            const userId = await this._service.addUser({ username, password, fullname });

            const response = h.response({
                status: 'success',
                message: 'User berhasil ditambahkan',
                data: {
                    userId
                }
            });

            response.code(201);

            return response;
        } catch (error) {
            return errorResponse(error, h);
        }
    }

    async getUserByIdHandler(request, h) {
        try {
            const { id } = request.params;

            const user = await this._service.getUserById(id);

            return {
                status: 'success',
                data: {
                    user
                }
            };
        } catch (error) {
            return errorResponse(error, h);
        }
    }

    async getUsersByUsernameHandler(request, h) {
        try {
            const { username = '' } = request.query;
            const users = await this._service.getUsersByUsername(username);

            return {
                status: 'success',
                data: {
                    users
                }
            };
        } catch(error) {
            return errorResponse(error, h);
        }
    }
}

module.exports = UsersHandler;