
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "O título é obrigatório"],
        trim: true,
        maxlength: [100, "O título deve ter no máximo 100 caracteres"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "A descrição deve ter no máximo 500 caracteres"],
        default: ""
    },
    status: {
        type: String,
        enum: {
            values: ["pendente", "concluída"],
            message: "Status inválido"
        },
        default: "pendente"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);