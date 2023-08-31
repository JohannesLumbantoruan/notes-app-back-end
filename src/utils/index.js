const ClientError = require("../exceptions/ClientError");

const mapDBToModel = ({
    id,
    title,
    body,
    tags,
    created_at,
    updated_at,
    username
}) => ({
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
    username
});

const errorResponse = (error, h) => {
    if (error instanceof ClientError) {
        const response = h.response({
            status: 'fail',
            message: error.message
        });

        response.code(error.statusCode);

        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
    });

    response.code(500);

    console.error(error);

    return response;
};

module.exports = {
    mapDBToModel,
    errorResponse
};