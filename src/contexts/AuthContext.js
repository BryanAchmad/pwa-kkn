import React, { createContext, useState, useContext } from 'react';
// import { useContext } from 'react';
// import axios from 'src/api/axios';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
// import { isAuthenticated } from 'src/api/auth';
// import LoginPage from 'src/content/auth/Login';
// import axios from 'src/api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [currentKelompok, setCurrentKelompok] = useState();
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));
    const checkToken = localStorage.getItem('token');
    console.log('token check', checkToken);

    const login = (data) => {
        localStorage.setItem('token', JSON.stringify(data?.data?.access_token));
        localStorage.setItem('mhs', JSON.stringify(data?.data?.idMahasiswa?._id));
        localStorage.setItem('kel', JSON.stringify(data?.data?.kelompok?.no_kelompok));
        setCurrentUser(data?.data?.idMahasiswa?._id);
        setCurrentKelompok(data?.data?.kelompok?.no_kelompok);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('mhs');
        localStorage.removeItem('kel');
        setCurrentUser('');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                currentKelompok,
                login,
                logout,
                authenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthContext;

function useAuthentication() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('Context must be used within a Provider');
    }
    return context;
}

export { AuthProvider, useAuthentication };
