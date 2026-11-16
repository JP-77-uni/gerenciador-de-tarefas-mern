import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("todas");
    const [search, setSearch] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
            setError("");
        } catch (error) {
            if (
                error.message.toLowerCase().includes("token")
            ) {
                handleLogout();
                return;
            }

            setError(error.message);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
            return;
        }

        loadTasks();
    }, [navigate]);

    const counts = useMemo(() => ({
        todas: tasks.length,
        pendente: tasks.filter(
            task => task.status === "pendente"
        ).length,
        concluída: tasks.filter(
            task => task.status === "concluída"
        ).length
    }), [tasks]);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesFilter =
                filter === "todas" || task.status === filter;

            const term = search.trim().toLowerCase();

            const matchesSearch =
                !term ||
                `${task.title} ${task.description || ""}`
                    .toLowerCase()
                    .includes(term);

            return matchesFilter && matchesSearch;
        });
    }, [tasks, filter, search]);

    const handleNewTask = () => {
        setEditingTask(null);
        setShowForm(true);
        setError("");
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
        setError("");
    };

    const handleSave = async (taskData) => {
        try {
            if (editingTask) {
                await updateTask(editingTask._id, taskData);
            } else {
                await createTask(taskData);
            }

            setEditingTask(null);
            setShowForm(false);

            await loadTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Deseja realmente excluir esta tarefa?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteTask(id);
            await loadTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            const newStatus =
                task.status === "pendente"
                    ? "concluída"
                    : "pendente";

            await updateTask(task._id, {
                status: newStatus
            });

            await loadTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Gerenciador de Tarefas</h1>
                    <p>Olá, {user.name || "usuário"}!</p>
                </div>

                <button onClick={handleLogout}>
                    Sair
                </button>
            </header>

            <main className="dashboard-main">
                {error && (
                    <p className="error">{error}</p>
                )}

                <section className="dashboard-actions">
                    <h2>Minhas tarefas</h2>

                    <button
                        className="new-task"
                        onClick={handleNewTask}
                    >
                        + Nova tarefa
                    </button>
                </section>

                <section className="task-stats">
                    <div>
                        <strong>{counts.todas}</strong>
                        <span>Total</span>
                    </div>

                    <div>
                        <strong>{counts.pendente}</strong>
                        <span>Pendentes</span>
                    </div>

                    <div>
                        <strong>{counts["concluída"]}</strong>
                        <span>Concluídas</span>
                    </div>
                </section>

                <div className="task-filters">
                    <input
                        type="text"
                        placeholder="Buscar tarefa..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />

                    <select
                        value={filter}
                        onChange={event => setFilter(event.target.value)}
                    >
                        <option value="todas">Todas</option>
                        <option value="pendente">Pendentes</option>
                        <option value="concluída">Concluídas</option>
                    </select>
                </div>

                {showForm && (
                    <TaskForm
                        task={editingTask}
                        onSave={handleSave}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingTask(null);
                        }}
                    />
                )}

                <section className="tasks">
                    {filteredTasks.length === 0 ? (
                        <p className="empty-message">
                            Nenhuma tarefa encontrada.
                        </p>
                    ) : (
                        filteredTasks.map(task => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggle={handleToggleStatus}
                            />
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;