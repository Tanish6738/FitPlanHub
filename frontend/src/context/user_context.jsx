import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserProfile } from '../services/user.services';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userData = await getUserProfile();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
