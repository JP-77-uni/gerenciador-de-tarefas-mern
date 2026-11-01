
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error("MONGODB_URI e JWT_SECRET devem estar configurados.");
}

app.use(cors({
    origin: process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
        : ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
    res.json({ message: "API funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Rota não encontrada"
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB conectado");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Servidor iniciado na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error.message);
        process.exit(1);
    });