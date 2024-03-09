const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { response: response } = require('../utils/response');

exports.hasAuth = (req, res, next) => {
    const token = req.body.token || req.headers.authorization?.split(' ')[1] || req.query.token;

    if (!token) {
        return response(res, 403, { status: false, message: "Authorization token is missing" });
    }

    jwt.verify(token, JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            return response(res, 403, { status: false, message: "Invalid authorization token" });
        }

        const user = payload.uuid;
        req.user = user;
        next();
    });
}