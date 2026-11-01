
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token não informado ou inválido"
        });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token não informado"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido ou expirado"
        });
    }
};

module.exports = authMiddleware;