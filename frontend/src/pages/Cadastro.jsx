import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Cadastro() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (form.name.trim().length === 0) {
            setError("Informe seu nome.");
            return;
        }

        if (form.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            await registerUser({
                ...form,
                name: form.name.trim()
            });

            setMessage("Cadastro realizado com sucesso!");

            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>TaskFlow</h1>

                <h2>Criar conta</h2>

                <p>Cadastre-se para organizar suas tarefas.</p>

                <form onSubmit={handleSubmit}>
                    <label>Nome</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={handleChange}
                        maxLength="100"
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Seu email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Senha</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Crie uma senha"
                        value={form.password}
                        onChange={handleChange}
                        minLength="6"
                        maxLength="128"
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>

                {error && (
                    <p className="error">{error}</p>
                )}

                {message && (
                    <p className="success">{message}</p>
                )}

                <p>
                    Já possui uma conta?{" "}
                    <Link to="/">
                        Fazer login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Cadastro;