import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskItem from "./components/taskitem";
import { tarefasMock } from "./data/tarefas";

function App() {
  const [tarefas] = useState(tarefasMock);

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="conteudo">
          {tarefas.map((tarefa) => (
            <TaskItem
              key={tarefa.id}
              titulo={tarefa.titulo}
              descricao={tarefa.descricao}
              responsavel={tarefa.responsavel}
              status={tarefa.status}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;