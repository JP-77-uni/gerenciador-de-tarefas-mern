
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório"],
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, "O email é obrigatório"],
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: [true, "A senha é obrigatória"],
        minlength: 6,
        select: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);