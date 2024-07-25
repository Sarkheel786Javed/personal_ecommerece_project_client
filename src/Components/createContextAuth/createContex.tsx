import React, { useState, useEffect, useContext, createContext, ReactNode } from "react";
import axios from "axios";

interface AuthState {
    token: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<[AuthState, React.Dispatch<React.SetStateAction<AuthState>>] | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({
        token: "",
    });

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                token: parseData.token,
            });
            axios.defaults.headers.common["Authorization"] = parseData.token;
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};


// Custom hook
const useAuth = (): [AuthState, React.Dispatch<React.SetStateAction<AuthState>>] => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { useAuth, AuthProvider };
