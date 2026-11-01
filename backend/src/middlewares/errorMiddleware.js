
const errorMiddleware = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: Object.values(error.errors)
                .map((item) => item.message)
                .join(", ")
        });
    }

    if (error.name === "CastError") {
        return res.status(400).json({
            message: "Dados ou identificador inválidos"
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            message: "Registro já cadastrado"
        });
    }

    if (error instanceof SyntaxError && error.status === 400) {
        return res.status(400).json({
            message: "JSON inválido"
        });
    }

    console.error(error);

    return res.status(500).json({
        message: "Erro interno do servidor"
    });
};

module.exports = errorMiddleware;