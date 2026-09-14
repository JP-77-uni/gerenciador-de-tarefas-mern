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

        try {
            await registerUser(form);

            setMessage("Cadastro realizado com sucesso");

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Criar conta</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>

                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}

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