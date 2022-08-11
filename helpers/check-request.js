const jwt = require("jsonwebtoken");
const responseError = require('./response-error')

exports.headers = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWTKEY);
        req.userData = decoded;
        if (!token) return res.status(200).json(responseError(202));
        next();
    } catch (error) {
        if (error) return res.status(200).json(responseError(401));
    }
};