function TaskCard({ task, onEdit, onDelete, onToggle }) {
    return (
        <article className="task-card">
            <div className="task-card-content">
                <h3>{task.title}</h3>

                <p>
                    {task.description || "Sem descrição"}
                </p>

                <span className={`status ${task.status === "concluída" ? "completed" : "pending"}`}>
                    {task.status}
                </span>
            </div>

            <div className="task-buttons">
                <button onClick={() => onToggle(task)}>
                    {task.status === "pendente"
                        ? "Concluir"
                        : "Reabrir"}
                </button>

                <button onClick={() => onEdit(task)}>
                    Editar
                </button>

                <button onClick={() => onDelete(task._id)}>
                    Excluir
                </button>
            </div>
        </article>
    );
}

export default TaskCard;