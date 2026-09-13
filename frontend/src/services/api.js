const API_URL = "http://localhost:3000/api";

const request = async (url, options = {}) => {
    const response = await fetch(`${API_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Erro na requisição");
    }

    return data;
};

const getToken = () => {
    return localStorage.getItem("token");
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