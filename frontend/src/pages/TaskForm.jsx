import { useEffect, useState } from "react";

function TaskForm({ task, onSave, onCancel }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "pendente"
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || "",
                description: task.description || "",
                status: task.status || "pendente"
            });
        } else {
            setForm({
                title: "",
                description: "",
                status: "pendente"
            });
        }

        setError("");
    }, [task]);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setError("O título é obrigatório.");
            return;
        }

        if (form.title.trim().length > 100) {
            setError("O título deve ter no máximo 100 caracteres.");
            return;
        }

        if (form.description.length > 500) {
            setError("A descrição deve ter no máximo 500 caracteres.");
            return;
        }

        setError("");

        await onSave({
            title: form.title.trim(),
            description: form.description.trim(),
            status: form.status
        });
    };

    return (
        <div className="task-form">
            <h2>
                {task ? "Editar tarefa" : "Nova tarefa"}
            </h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Título
                    <input
                        type="text"
                        name="title"
                        maxLength="100"
                        placeholder="Digite o título"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Descrição
                    <textarea
                        name="description"
                        maxLength="500"
                        placeholder="Digite a descrição"
                        value={form.description}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Status
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
                </label>

                {error && (
                    <p className="error">{error}</p>
                )}

                <div className="form-buttons">
                    <button type="submit">
                        {task ? "Salvar alterações" : "Criar tarefa"}
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