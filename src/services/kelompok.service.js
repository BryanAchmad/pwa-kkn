import { useEffect, useState } from 'react';
import axios from '../api/axios';

const useProkerData = () => {
  const [prokers, setProkers] = useState([]);
  const [divisi, setDivisi] = useState();
  const [mediaPub, setMediaPub] = useState();
  const [user, setUser] = useState();
  const [fetching, isFetching] = useState(false);

  const id = '63734f0c41bfdb7ca8fbe819';
  const kelompok = '10';
  const userId = '63734e7741bfdb7ca8fbe817';

  useEffect(() => {
    const fetchData = async () => {
      isFetching(true);
      const result = (
        await Promise.all([
          axios.get(`/proker/${id}`),
          axios.get(`/divisi`),
          axios.get(`/media/${kelompok}`),
          axios.get(`/mahasiswa/details/${userId}`)
        ])
      ).map((r) => r);

      const [prokersResult, divisiResult, mediaPubResult, userResult] =
        await Promise.all(result);

      setProkers(prokersResult);
      setDivisi(divisiResult);
      setMediaPub(mediaPubResult);
      setUser(userResult);
      isFetching(false);
    };

    fetchData();
  }, []);

  console.log('from service', prokers, divisi, mediaPub, user);

  return { prokers, divisi, mediaPub, user, fetching };
};

export default useProkerData;
