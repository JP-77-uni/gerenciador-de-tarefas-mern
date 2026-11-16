const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getToken = () => {
    return localStorage.getItem("token");
};

const request = async (url, options = {}) => {
    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
        ? await response.json()
        : null;

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }

        throw new Error(data?.message || "Erro na requisição");
    }

    return data;
};

export const registerUser = async (userData) => {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const loginUser = async (userData) => {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const getTasks = async () => {
    return request("/tasks", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const createTask = async (taskData) => {
    return request("/tasks", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(taskData)
    });
};

export const updateTask = async (id, taskData) => {
    return request(`/tasks/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(taskData)
    });
};

export const deleteTask = async (id) => {
    return request(`/tasks/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};