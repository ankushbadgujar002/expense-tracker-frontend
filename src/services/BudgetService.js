import axios from "axios";

const BASE_URL = "http://localhost:8080/users";
const getUserId = () => localStorage.getItem("userId");

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


export const getBudget = () => {
    return axios.get(
        `${BASE_URL}/budget/${getUserId()}`,
        getAuthHeader()
    );
};

export const updateBudget = async(budget) => {
    const res = await axios.put(
        `${BASE_URL}/budget`, {
            userId: getUserId(),
            totalBudget: budget
        },
        getAuthHeader()
    );

    return res.data;
};