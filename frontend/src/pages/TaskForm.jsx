import { useEffect, useState } from "react";

function TaskForm({ task, onSave, onCancel }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "pendente"
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description: task.description || "",
                status: task.status
            });
        } else {
            setForm({
                title: "",
                description: "",
                status: "pendente"
            });
        }
    }, [task]);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.title.trim()) {
            return;
        }

        onSave(form);
    };

    return (
        <div className="task-form">
            <h2>
                {task ? "Editar tarefa" : "Nova tarefa"}
            </h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={form.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Descrição"
                    value={form.description}
                    onChange={handleChange}
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="pendente">
                        Pendente
                    </option>

                    <option value="concluída">
                        Concluída
                    </option>
                </select>

                <div className="form-buttons">
                    <button type="submit">
                        {task ? "Salvar" : "Criar tarefa"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;