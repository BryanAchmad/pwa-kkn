import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'src/api/axios';
import { getProkerReq } from 'src/api/proker';
import { useAuthentication } from './AuthContext';

const ApiContext = createContext();

// const initialState = {
//   isFetching: false
// };

export const ApiProvider = ({ children }) => {
    const { isAuthenticated } = useAuthentication();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [prokers, setProkers] = useState();
    const [divisi, setDivisi] = useState();
    const [media, setMedia] = useState();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [hasNewData, setHasNewData] = useState(false);

    const id = '63734f0c41bfdb7ca8fbe819';
    const kelompok = '10';
    const userId = '63734e7741bfdb7ca8fbe817';

    //   const fetchProker = axios.get(`/proker/${id}`);
    //   const fetchDivisi = axios.get(`/divisi`);
    //   const fetchMedia = axios.get(`/media/${kelompok}`);
    //   const fetchUser = axios.get(`/mahasiswa/details/${userId}`);

    // const fetchAll = useCallback(async () => {
    //   // if (authContext.auth === true) {
    //   setIsLoading(true);
    //   console.log('from fetchAll', isLoading);
    //   const result = (
    //     await Promise.all([
    //       getProkerReq(id),
    //       axios.get(`/divisi`),
    //       axios.get(`/media/${kelompok}`),
    //       axios.get(`/mahasiswa/details/${userId}`)
    //     ])
    //   ).map((r) => r);
    //   console.log('promise result', result);

    //   const [prokerResult, divisiResult, mediaResult, userResult] =
    //     await Promise.all(result);

    //   setProkers(prokerResult);
    //   setDivisi(divisiResult);
    //   setMedia(mediaResult);
    //   setUser(userResult);
    //   setIsLoading(false);
    //   // }
    // }, []);

    // const handleFetch = () => {
    //   setIsLoading(true);
    //   fetchAll();
    //   setIsLoading(false);
    // };
    useEffect(() => {
        if (isAuthenticated || hasNewData) {
            setIsFetching(true);
            const result = Promise.all([
                getProkerReq(id),
                axios.get(`/divisi`),
                axios.get(`/media/${kelompok}`),
                axios.get(`/mahasiswa/details/${userId}`)
            ]).map((r) => r);
            console.log('promise result', result);

            const [prokerResult, divisiResult, mediaResult, userResult] =
                Promise.all(result);

            setProkers(prokerResult);
            setDivisi(divisiResult);
            setMedia(mediaResult);
            setUser(userResult);
            setIsLoading(false);
            setIsFetching(false);
            setHasNewData(false);
        }
        // fetchAll();
    }, [isAuthenticated, hasNewData]);

    console.log(prokers);

    // const login = () => {
    //   setIsLoggedIn(true);
    // }

    const addNewData = () => {
        setHasNewData(true);
    };

    // const updateProker = async (id, data) => {
    //   try {
    //     const response = await updateProkerReq(id, data);
    //     if(!response)
    //       throw new Error()

    //     setProkers()
    //   }
    // }

    // const value = { prokers, setProkers, divisi, media, user, isLoading };

    return (
        <ApiContext.Provider
            value={{
                prokers,
                // createProker,
                isFetching,
                divisi,
                media,
                user,
                isLoading,
                addNewData
                // getProkers,
                // fetchAll
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;

export function useAPI() {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('Context must be used within a Provider');
    }
    return context;
}
