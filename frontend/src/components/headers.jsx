
function Header({ onNovaTarefa, busca, onBusca }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="TaskFlow início">
        <span className="brand-mark">✓</span>
        <span>task<span>flow</span></span>
      </a>

      <div className="topbar-actions">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={busca}
            onChange={(event) => onBusca(event.target.value)}
            placeholder="Buscar tarefas..."
            aria-label="Buscar tarefas"
          />
          <kbd>⌘ K</kbd>
        </label>

        <button
          className="avatar"
          type="button"
          onClick={onNovaTarefa}
          aria-label="Criar tarefa"
        >
          JP
        </button>
      </div>
    </header>
  );
}

export default Header;