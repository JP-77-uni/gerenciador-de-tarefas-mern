import { useMemo, useState } from "react";
import Header from "./components/headers";
import Sidebar from "./components/sidebars";
import TaskItem from "./components/taskitem";
import { tarefasIniciais } from "./data/tarefa";

function App() {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [filtro, setFiltro] = useState("todas");
  const [busca, setBusca] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    responsavel: "",
    status: "pendente",
    prioridade: "media"
  });

  const contagens = useMemo(() => ({
    todas: tarefas.length,
    pendente: tarefas.filter((tarefa) => tarefa.status === "pendente").length,
    concluida: tarefas.filter((tarefa) => tarefa.status === "concluida").length
  }), [tarefas]);

  const tarefasFiltradas = useMemo(() => tarefas.filter((tarefa) => {
    const correspondeFiltro = filtro === "todas" || tarefa.status === filtro;
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    const correspondeBusca = !termo || `${tarefa.titulo} ${tarefa.descricao} ${tarefa.responsavel}`.toLocaleLowerCase("pt-BR").includes(termo);
    return correspondeFiltro && correspondeBusca;
  }), [tarefas, filtro, busca]);

  const abrirNovaTarefa = () => {
    setEditando(null);
    setForm({
      titulo: "",
      descricao: "",
      responsavel: "",
      status: "pendente",
      prioridade: "media"
    });
    setMostrarFormulario(true);
  };

  const abrirEdicao = (tarefa) => {
    setEditando(tarefa.id);
    setForm({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      responsavel: tarefa.responsavel,
      status: tarefa.status,
      prioridade: tarefa.prioridade
    });
    setMostrarFormulario(true);
  };

  const salvarTarefa = (event) => {
    event.preventDefault();

    if (!form.titulo.trim() || !form.responsavel.trim()) return;

    if (editando) {
      setTarefas((atuais) => atuais.map((tarefa) =>
        tarefa.id === editando
          ? {
              ...tarefa,
              ...form,
              titulo: form.titulo.trim(),
              responsavel: form.responsavel.trim()
            }
          : tarefa
      ));
    } else {
      setTarefas((atuais) => [{
        ...form,
        id: crypto.randomUUID(),
        titulo: form.titulo.trim(),
        responsavel: form.responsavel.trim()
      }, ...atuais]);
    }

    setMostrarFormulario(false);
    setEditando(null);
  };

  const alternarStatus = (id) => {
    setTarefas((atuais) => atuais.map((tarefa) =>
      tarefa.id === id
        ? {
            ...tarefa,
            status: tarefa.status === "concluida" ? "pendente" : "concluida"
          }
        : tarefa
    ));
  };

  const excluirTarefa = (id) => {
    setTarefas((atuais) => atuais.filter((tarefa) => tarefa.id !== id));
  };

  return (
    <div className="app-shell">
      <Header
        onNovaTarefa={abrirNovaTarefa}
        busca={busca}
        onBusca={setBusca}
      />

      <div className="workspace">
        <Sidebar
          filtro={filtro}
          onFiltro={setFiltro}
          contagens={contagens}
        />

        <main className="main-content">
          <section className="welcome-row">
            <div>
              <span className="eyebrow">VISÃO GERAL</span>
              <h1>Minhas tarefas</h1>
              <p>Organize seu dia e acompanhe o que precisa ser feito.</p>
            </div>

            <button
              className="primary-button desktop-create"
              onClick={abrirNovaTarefa}
            >
              ＋ Nova tarefa
            </button>
          </section>

          <section className="stats-grid" aria-label="Resumo das tarefas">
            <article className="stat-card">
              <span className="stat-icon purple">▤</span>
              <div>
                <span>Total de tarefas</span>
                <strong>{contagens.todas}</strong>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon amber">◷</span>
              <div>
                <span>Pendentes</span>
                <strong>{contagens.pendente}</strong>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon green">✓</span>
              <div>
                <span>Concluídas</span>
                <strong>{contagens.concluida}</strong>
              </div>
            </article>
          </section>

          <section className="task-section">
            <div className="section-heading">
              <div>
                <h2>Lista de atividades</h2>
                <p>
                  {tarefasFiltradas.length}{" "}
                  {tarefasFiltradas.length === 1
                    ? "atividade encontrada"
                    : "atividades encontradas"}
                </p>
              </div>

              <button
                className="primary-button mobile-create"
                onClick={abrirNovaTarefa}
              >
                ＋ Nova tarefa
              </button>
            </div>

            {mostrarFormulario && (
              <form className="task-editor" onSubmit={salvarTarefa}>
                <div className="editor-heading">
                  <h3>{editando ? "Editar tarefa" : "Adicionar tarefa"}</h3>

                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setMostrarFormulario(false)}
                    aria-label="Fechar formulário"
                  >
                    ×
                  </button>
                </div>

                <div className="form-grid">
                  <label className="field field-wide">
                    Título
                    <input
                      value={form.titulo}
                      onChange={(event) => setForm({ ...form, titulo: event.target.value })}
                      placeholder="Ex.: Preparar apresentação"
                      maxLength={100}
                      required
                    />
                  </label>

                  <label className="field field-wide">
                    Descrição
                    <textarea
                      value={form.descricao}
                      onChange={(event) => setForm({ ...form, descricao: event.target.value })}
                      placeholder="Descreva brevemente a atividade"
                      maxLength={500}
                      rows={3}
                    />
                  </label>

                  <label className="field">
                    Responsável
                    <input
                      value={form.responsavel}
                      onChange={(event) => setForm({ ...form, responsavel: event.target.value })}
                      placeholder="Nome do responsável"
                      required
                    />
                  </label>

                  <label className="field">
                    Prioridade
                    <select
                      value={form.prioridade}
                      onChange={(event) => setForm({ ...form, prioridade: event.target.value })}
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                    </select>
                  </label>

                  <label className="field">
                    Status
                    <select
                      value={form.status}
                      onChange={(event) => setForm({ ...form, status: event.target.value })}
                    >
                      <option value="pendente">Pendente</option>
                      <option value="concluida">Concluída</option>
                    </select>
                  </label>
                </div>

                <div className="editor-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setMostrarFormulario(false)}
                  >
                    Cancelar
                  </button>

                  <button type="submit" className="primary-button">
                    {editando ? "Salvar alterações" : "Criar tarefa"}
                  </button>
                </div>
              </form>
            )}

            {tarefasFiltradas.length ? (
              <div className="task-list">
                {tarefasFiltradas.map((tarefa) => (
                  <TaskItem
                    key={tarefa.id}
                    tarefa={tarefa}
                    onAlternar={alternarStatus}
                    onEditar={abrirEdicao}
                    onExcluir={excluirTarefa}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>⌕</span>
                <h3>Nenhuma tarefa encontrada</h3>
                <p>Tente alterar a busca ou o filtro selecionado.</p>

                <button
                  className="secondary-button"
                  onClick={() => {
                    setBusca("");
                    setFiltro("todas");
                  }}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;