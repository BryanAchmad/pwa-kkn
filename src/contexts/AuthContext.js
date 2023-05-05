import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useContext } from 'react';
// import axios from 'src/api/axios';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import { isAuthenticated } from 'src/api/auth';
import LoginPage from 'src/content/auth/Login';
// import axios from 'src/api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let currentUser = isAuthenticated();
            if (currentUser === null) {
                localStorage.setItem('user', '');
                currentUser = '';
            }

            setUser(currentUser);
        };

        checkLoggedIn();
    }, []);

    console.log('userContext', user);

    // const login = (data) => {
    //     console.log(data);
    //     // const [user, setUser] = useState();
    //     try {
    //         const response = axios.post(
    //             'https://kkn-umm.vercel.app/login',
    //             data
    //         );

    //         if (response['status'] === true) {
    //             console.log('response success', response);
    //             setIsAuthenticated(true);
    //             setUser(response?.data);
    //             localStorage.setItem('token', response?.data?.access_token);
    //         } else {
    //             console.log('response', response);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     return isAuthenticated;
    //     // axios
    //     //     .post('https://kkn-umm.vercel.app/login', data)
    //     //     .then((response) => {
    //     //         console.log('response', response);
    //     //         const res = JSON.parse(response);
    //     //         // if(res) throw new Error(res);
    //     //         console.log('response', res);
    //     //         // if (res['success'] === true) {
    //     //         setIsAuthenticated(true);
    //     //         setUser(response);
    //     //         localStorage.setItem('token', response?.data?.access_token);
    //     //         // }
    //     //         console.log('login', response);
    //     //         // return isAuthenticated;
    //     //     })
    //     //     .catch((error) => {
    //     //         setIsAuthenticated(false);
    //     //         window.alert(error);
    //     //         console.log('error ', error);
    //     //     });
    // };

    // const logout = async () => {
    //     localStorage.removeItem('token');
    //     setIsAuthenticated(false);
    // };

    // const value = { user, isAuthenticated, login, logout };

    // const getUser = async () => {
    //   try {
    //     const user = await login();
    //     setAuth(true);
    //     setUser(user.data);
    //   } catch (e) {
    //     setAuth(false);
    //     setUser(null);
    //   }
    // };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated}}>
            {user?.access_token ? children : <LoginPage/>}
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
