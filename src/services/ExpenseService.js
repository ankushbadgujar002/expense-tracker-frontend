import apiClient from "./apiClient";

const getUserId = () => {
    const id = localStorage.getItem("userId");
    return id && id !== "null" ? id : null;
};

export const getExpenses = () => {
    return apiClient.get(`/expenses/user/${getUserId()}`);
};

export const addExpense = (expense) => {
    return apiClient.post(`/expenses/user/${getUserId()}`, expense);
};

export const updateExpense = (id, expense) => {
    return apiClient.put(`/expenses/${id}`, expense);
};

export const deleteExpense = (id) => {
    return apiClient.delete(`/expenses/${id}`);
};

export const getMonthlySummary = () => {
    const userId = getUserId();
    return apiClient.get(`/expenses/monthly-summary/${userId}`);
};