import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";

function RotaProtegida({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/cadastro" element={<Cadastro />} />

                <Route
                    path="/dashboard"
                    element={
                        <RotaProtegida>
                            <Dashboard />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;