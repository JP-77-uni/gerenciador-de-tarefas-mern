function TaskCard({ task, onEdit, onDelete }) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>

            <p>
                {task.description || "Sem descrição"}
            </p>

            <span className={`status ${task.status}`}>
                {task.status}
            </span>

            <div className="task-buttons">
                <button onClick={() => onEdit(task)}>
                    Editar
                </button>

                <button onClick={() => onDelete(task._id)}>
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default TaskCard;