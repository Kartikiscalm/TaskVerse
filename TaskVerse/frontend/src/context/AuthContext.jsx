import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
    });

    api.interceptors.request.use((config) => {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchUser();
        } else {
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/profile');
            setUser(res.data);
        } catch (err) {
            console.error(err);
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const loginWithUsername = async (username, password, mode = 'signin') => {
        try {
            const res = await api.post('/auth/login', { username, password, mode });
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            console.error('Login failed', err);
            return {
                success: false,
                message: err.response?.data?.message || 'The Matrix hit an unexpected error.'
            };
        }
    };

    const logout = () => {
        setToken(null);
    };

    const loginWithGoogle = async (tokenResponse) => {
        try {
            const res = await api.post('/auth/google', { googleToken: tokenResponse.credential });
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            console.error('Google login failed', err);
            return { success: false, message: 'Google authentication failed.' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, loginWithUsername, loginWithGoogle, logout, loading, api }}>
            {children}
        </AuthContext.Provider>
    );
};
