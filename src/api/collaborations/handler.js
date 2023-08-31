const autoBind = require('auto-bind');

const { errorResponse } = require('../../utils');

class CollaborationsHandler {
    constructor(collaborationsService, notesService, validator) {
        this._collaborationsService = collaborationsService;
        this._notesService = notesService;
        this._validator = validator;

        autoBind(this);
    }

    async postCollaborationHandler(request, h) {
        try {
            this._validator.validateCollaborationPayload(request.payload);

            const { id: credentialId } = request.auth.credentials;
            const { noteId, userId } = request.payload;

            await this._notesService.verifyNoteOwner(noteId, credentialId);

            const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);

            const response = h.response({
                status: 'success',
                message: 'Kolaborasi berhasil ditambahkan',
                data: {
                    collaborationId
                }
            });

            response.code(201);

            return response;
        } catch (error) {
            return errorResponse(error, h);
        }
    }

    async deleteCollaborationHandler(request, h) {
        try {
            this._validator.validateCollaborationPayload(request.payload);

            const { id: credentialId } = request.auth.credentials;
            const { noteId, userId } = request.payload;

            await this._notesService.verifyNoteOwner(noteId, credentialId);

            await this._collaborationsService.deleteCollaboration(noteId, userId);

            const response = {
                status: 'success',
                message: 'Kolaborasi berhasil dihapus'
            };

            return response;
        } catch (error) {
            return errorResponse(error, h);
        }
    }
}

module.exports = CollaborationsHandler;