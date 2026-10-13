const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "O t\u00edtulo \u00e9 obrigat\u00f3rio"],
            trim: true,
            maxlength: [100, "O t\u00edtulo deve ter no m\u00e1ximo 100 caracteres"]
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "A descri\u00e7\u00e3o deve ter no m\u00e1ximo 500 caracteres"],
            default: ""
        },
        status: {
            type: String,
            enum: {
                values: ["pendente", "conclu\u00edda"],
                message: "Status inv\u00e1lido"
            },
            default: "pendente"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "O usu\u00e1rio \u00e9 obrigat\u00f3rio"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);
module.exports = mongoose.model("Task", taskSchema);
