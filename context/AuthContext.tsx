import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const AuthContext = createContext<{user: User | null; loading: boolean}>({
    user: null,
    loading: true
});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ?? null);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{user , loading}} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };