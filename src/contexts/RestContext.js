import React, { createContext, useState, useEffect } from 'react';
// import axios from 'src/api/axios';
import axios from 'axios';
// import { getProkerReq, createProkerReq } from 'src/api/proker';
// import ApiContext from './ApiContext';
// import AuthContext from './AuthProvider';

const RestContext = createContext();

const RestProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasNewData, setHasNewData] = useState(false);

    const id = '63734f0c41bfdb7ca8fbe819';
    // const kelompok = '10';
    // const userId = '63734e7741bfdb7ca8fbe817';

    console.log(isLoggedIn);
    useEffect(() => {
        if (isLoggedIn || hasNewData) {
            axios
                .get(`https://kkn-umm.vercel.app/proker/${id}`)
                .then((data) => {
                    console.log(data);
                    setData(data);
                })
                .catch((err) => console.log(err));
            console.log('data', data);
            setHasNewData(false);
        }
    }, [isLoggedIn, hasNewData]);

    console.log(data);

    const login = () => {
        setIsLoggedIn(true);
    };

    const addNewData = () => {
        setHasNewData(true);
    };

    return (
        <RestContext.Provider value={{ data, login, addNewData }}>
            {children}
        </RestContext.Provider>
    );
};

export { RestContext, RestProvider };

// export function useRest() {
//     const context = useContext(RestContext);
//     if (context === undefined) {
//         throw new Error('Context must be used within a Provider');
//     }
//     return context;
// }
