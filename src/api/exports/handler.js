const autoBind = require('auto-bind');

const { errorResponse } = require('../../utils');

class ExportsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postExportNotesHandler(request, h) {
        try {
            this._validator.validateExportNotesPayload(request.payload);

            const message = {
                userId: request.auth.credentials.id,
                targetEmail: request.payload.targetEmail
            };

            await this._service.sendMessage('export:notes', JSON.stringify(message));

            const response = h.response({
                status: 'success',
                message: 'Permintaan Anda dalam antrean'
            });

            response.code(201);

            return response;
        } catch (error) {
            return errorResponse(error, h);
        }
    }
}

module.exports = ExportsHandler;