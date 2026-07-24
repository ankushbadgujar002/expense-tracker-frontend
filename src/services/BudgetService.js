import apiClient from "./apiClient";

const getUserId = () => localStorage.getItem("userId");

export const getBudget = () => {
    return apiClient.get(`/users/budget/${getUserId()}`);
};

export const updateBudget = async (budget) => {
    const res = await apiClient.put(`/users/budget`, {
        userId: getUserId(),
        totalBudget: budget
    });
    return res.data;
};