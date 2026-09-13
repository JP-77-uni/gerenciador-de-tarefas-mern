import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
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

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            if (
                error.message.includes("Token")
            ) {
                handleLogout();
            } else {
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        loadTasks();
    }, []);

    const handleSave = async (taskData) => {
        try {
            if (editingTask) {
                await updateTask(
                    editingTask._id,
                    taskData
                );
            } else {
                await createTask(taskData);
            }

            setEditingTask(null);
            setShowForm(false);
            setError("");

            await loadTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleNewTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    return (
        <div className="dashboard">
            <header>
                <div>
                    <h1>Minhas tarefas</h1>
                    <p>
                        Olá, {user.name || "usuário"}!
                    </p>
                </div>

                <button onClick={handleLogout}>
                    Sair
                </button>
            </header>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <main>
                {showForm ? (
                    <TaskForm
                        task={editingTask}
                        onSave={handleSave}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingTask(null);
                        }}
                    />
                ) : (
                    <button
                        className="new-task"
                        onClick={handleNewTask}
                    >
                        Nova Tarefa
                    </button>
                )}

                <section className="tasks">
                    {tasks.length === 0 ? (
                        <p>
                            Você ainda não possui tarefas.
                        </p>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;