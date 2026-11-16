import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
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
        setLoading(true);

        try {
            const data = await loginUser(form);

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");
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

                <h2>Bem-vindo de volta!</h2>

                <p>Entre para acessar suas tarefas.</p>

                <form onSubmit={handleSubmit}>
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
                        placeholder="Sua senha"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                {error && (
                    <p className="error">{error}</p>
                )}

                <p>
                    Não possui uma conta?{" "}
                    <Link to="/cadastro">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;