
const mongoose = require("mongoose");
const Task = require("../models/Task");

const sanitizeText = (value) => {
    return value
        .replace(/<[^>]*>/g, "")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
        .trim();
};

const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        if (
            typeof title !== "string" ||
            !title.trim()
        ) {
            return res.status(400).json({
                message: "O título é obrigatório"
            });
        }

        if (
            description !== undefined &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
                message: "Descrição inválida"
            });
        }

        if (
            status !== undefined &&
            !["pendente", "concluída"].includes(status)
        ) {
            return res.status(400).json({
                message: "Status inválido"
            });
        }

        const task = await Task.create({
            title: sanitizeText(title),
            description: sanitizeText(description || ""),
            status: status || "pendente",
            user: req.userId
        });

        return res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({
            user: req.userId
        }).sort({
            createdAt: -1
        });

        return res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID da tarefa inválido"
            });
        }

        const updates = {};

        if (title !== undefined) {
            if (typeof title !== "string" || !title.trim()) {
                return res.status(400).json({
                    message: "O título é inválido"
                });
            }

            updates.title = sanitizeText(title);
        }

        if (description !== undefined) {
            if (typeof description !== "string") {
                return res.status(400).json({
                    message: "Descrição inválida"
                });
            }

            updates.description = sanitizeText(description);
        }

        if (status !== undefined) {
            if (!["pendente", "concluída"].includes(status)) {
                return res.status(400).json({
                    message: "Status inválido"
                });
            }

            updates.status = status;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Informe os dados que deseja atualizar"
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: id,
                user: req.userId
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        return res.json(task);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID da tarefa inválido"
            });
        }

        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        return res.json({
            message: "Tarefa excluída com sucesso"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};