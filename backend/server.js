const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB conectado");

        app.listen(process.env.PORT || 3000, () => {
            console.log("Servidor iniciado");
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error);
    });