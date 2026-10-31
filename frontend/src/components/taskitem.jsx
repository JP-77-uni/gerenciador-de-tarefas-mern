function TaskItem({ tarefa, onAlternar, onEditar, onExcluir }) {
  const prioridade = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta"
  };

  return (
    <article className={`task-item ${tarefa.status === "concluida" ? "is-done" : ""}`}>
      <button
        className={`task-check ${tarefa.status === "concluida" ? "checked" : ""}`}
        type="button"
        onClick={() => onAlternar(tarefa.id)}
        aria-label={
          tarefa.status === "concluida"
            ? "Marcar como pendente"
            : "Marcar como concluída"
        }
      >
        {tarefa.status === "concluida" ? "✓" : ""}
      </button>

      <div className="task-main">
        <div className="task-title-row">
          <h3>{tarefa.titulo}</h3>
          <span className={`priority priority-${tarefa.prioridade}`}>
            {prioridade[tarefa.prioridade] || "Média"}
          </span>
        </div>

        <p className="task-description">{tarefa.descricao}</p>

        <div className="task-meta">
          <span className="person-avatar">
            {tarefa.responsavel
              .split(" ")
              .map((parte) => parte[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>

          <span>{tarefa.responsavel}</span>

          <span className={`status-label ${tarefa.status}`}>
            {tarefa.status === "concluida" ? "Concluída" : "Pendente"}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onEditar(tarefa)}
          aria-label={`Editar ${tarefa.titulo}`}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onExcluir(tarefa.id)}
          aria-label={`Excluir ${tarefa.titulo}`}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default TaskItem;