const mongoose = require("mongoose");
const Task = require("../models/Task");

const handleError = (error, res, fallbackMessage) => {
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((item) => item.message);

        return res.status(400).json({
            message: messages.join(", ")
        });
    }

    if (error.name === "CastError") {
        return res.status(400).json({
            message: "ID inválido"
        });
    }

    return res.status(500).json({
        message: fallbackMessage
    });
};

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            user: req.userId
        });

        return res.status(201).json(task);
    } catch (error) {
        return handleError(error, res, "Erro ao criar tarefa");
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.userId
        }).sort({
            createdAt: -1
        });

        return res.json(tasks);
    } catch (error) {
        return handleError(error, res, "Erro ao buscar tarefas");
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID da tarefa inválido"
            });
        }

        const updates = {};

        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status !== undefined) updates.status = status;

        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        return res.json(task);
    } catch (error) {
        return handleError(error, res, "Erro ao atualizar tarefa");
    }
};

const deleteTask = async (req, res) => {
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
        return handleError(error, res, "Erro ao excluir tarefa");
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};