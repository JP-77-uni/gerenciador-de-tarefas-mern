const mongoose = require("mongoose");
const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "O título é obrigatório"
            });
        }

        if (status && !["pendente", "concluída"].includes(status)) {
            return res.status(400).json({
                message: "Status inválido"
            });
        }

        const task = await Task.create({
            title: title.trim(),
            description: description ? description.trim() : "",
            status: status || "pendente",
            user: req.userId
        });

        return res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar tarefa"
        });
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
        return res.status(500).json({
            message: "Erro ao buscar tarefas"
        });
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

        if (status && !["pendente", "concluída"].includes(status)) {
            return res.status(400).json({
                message: "Status inválido"
            });
        }

        const task = await Task.findOne({
            _id: id,
            user: req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({
                    message: "O título é obrigatório"
                });
            }

            task.title = title.trim();
        }

        if (description !== undefined) {
            task.description = description.trim();
        }

        if (status !== undefined) {
            task.status = status;
        }

        await task.save();

        return res.json(task);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar tarefa"
        });
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
        return res.status(500).json({
            message: "Erro ao excluir tarefa"
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};