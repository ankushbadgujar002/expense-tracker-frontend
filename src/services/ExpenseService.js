import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/expenses`;

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const getUserId = () => {
    const id = localStorage.getItem("userId");
    return id && id !== "null" ? id : null;
};

export const getExpenses = () => {
    return axios.get(`${BASE_URL}/user/${getUserId()}`, getAuthHeader());
};

export const addExpense = (expense) => {
    return axios.post(
        `${BASE_URL}/user/${getUserId()}`,
        expense,
        getAuthHeader()
    );
};

export const updateExpense = (id, expense) => {
    return axios.put(`${BASE_URL}/${id}`, expense, getAuthHeader());
};

export const deleteExpense = (id) => {
    return axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
};

export const getMonthlySummary = () => {
    const userId = localStorage.getItem("userId");
    return axios.get(
        `${BASE_URL}/monthly-summary/${userId}`,
        getAuthHeader()
    );
};