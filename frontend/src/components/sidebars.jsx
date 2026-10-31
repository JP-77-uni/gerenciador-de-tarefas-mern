const opcoes = [
  { id: "todas", label: "Todas as tarefas", icon: "▤" },
  { id: "pendente", label: "Pendentes", icon: "◷" },
  { id: "concluida", label: "Concluídas", icon: "✓" }
];

function Sidebar({ filtro, onFiltro, contagens }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-label">MENU</div>

      <nav className="side-nav" aria-label="Filtros de tarefas">
        {opcoes.map((opcao) => (
          <button
            key={opcao.id}
            type="button"
            className={`nav-item ${filtro === opcao.id ? "active" : ""}`}
            onClick={() => onFiltro(opcao.id)}
          >
            <span className="nav-icon">{opcao.icon}</span>
            <span>{opcao.label}</span>
            <span className="nav-count">{contagens[opcao.id]}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-tip">
        <span className="tip-icon">✦</span>
        <strong>Um passo de cada vez.</strong>
        <p>
          Pequenas tarefas concluídas constroem grandes resultados.
        </p>
      </div>

      <div className="sidebar-footer">
        <span className="online-dot"></span>
        Seus dados estão nesta sessão
      </div>
    </aside>
  );
}

export default Sidebar;