import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react';
import axios from 'src/api/axios';
import { getProkerReq, createProkerReq } from 'src/api/proker';

const ApiContext = createContext();

// const initialState = {
//   isFetching: false
// };

export const ApiProvider = ({ children }) => {
  const [prokers, setProkers] = useState();
  const [divisi, setDivisi] = useState();
  const [media, setMedia] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const id = '63734f0c41bfdb7ca8fbe819';
  const kelompok = '10';
  const userId = '63734e7741bfdb7ca8fbe817';

  //   const fetchProker = axios.get(`/proker/${id}`);
  //   const fetchDivisi = axios.get(`/divisi`);
  //   const fetchMedia = axios.get(`/media/${kelompok}`);
  //   const fetchUser = axios.get(`/mahasiswa/details/${userId}`);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    console.log('from fetchAll', isLoading);
    const result = (
      await Promise.all([
        getProkerReq(id),
        axios.get(`/divisi`),
        axios.get(`/media/${kelompok}`),
        axios.get(`/mahasiswa/details/${userId}`)
      ])
    ).map((r) => r);
    console.log('promise result', result);

    const [prokerResult, divisiResult, mediaResult, userResult] =
      await Promise.all(result);

    setProkers(prokerResult);
    setDivisi(divisiResult);
    setMedia(mediaResult);
    setUser(userResult);
    setIsLoading(false);
  }, []);

  // const handleFetch = () => {
  //   setIsLoading(true);
  //   fetchAll();
  //   setIsLoading(false);
  // };
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  console.log(prokers);

  const createProker = async (id, data) => {
    // const id = '63734f0c41bfdb7ca8fbe819';
    // const param = {
    //   title, divisi, deskripsi
    // }
    try {
      setIsFetching(true);
      const response = await createProkerReq(id, data);
      console.log('create', response);
      if (!response) throw new Error();

      // const newProker = getProkerReq(id);

      // setProkers([...prokers, response]);
      // setIsFetching(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  const getProkers = (id) => {
    try {
      setIsFetching(true);
      const response = getProkerReq(id);
      setProkers(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
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
        createProker,
        isFetching,
        divisi,
        media,
        user,
        isLoading,
        getProkers,
        fetchAll
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
