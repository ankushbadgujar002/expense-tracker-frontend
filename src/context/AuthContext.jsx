import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
    const [userName, setUserName] = useState(() => localStorage.getItem("userName"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
        } else {
            localStorage.removeItem("userId");
        }
    }, [userId]);

    useEffect(() => {
        if (userName) {
            localStorage.setItem("userName", userName);
        } else {
            localStorage.removeItem("userName");
        }
    }, [userName]);

    const login = (data) => {
        if (data.token) {
            setToken(data.token);
            localStorage.setItem("token", data.token);
        }
        if (data.userId) {
            const idStr = data.userId.toString();
            setUserId(idStr);
            localStorage.setItem("userId", idStr);
        }
        if (data.username || data.userName) {
            const name = data.username || data.userName;
            setUserName(name);
            localStorage.setItem("userName", name);
        }
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        setUserName(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        sessionStorage.removeItem("welcomeShown");
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ token, userId, userName, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
