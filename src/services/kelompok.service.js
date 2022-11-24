import { useEffect, useState } from 'react';
import axios from '../api/axios';

const useProkerData = () => {
  const [prokers, setProkers] = useState([]);
  const [proker, setProker] = useState();
  const [fetching, isFetching] = useState(false);

  const id = '63734f0c41bfdb7ca8fbe819';

  useEffect(() => {
    const fetchData = async () => {
      isFetching(true);
      const result = (
        await Promise.all([
          axios.get(`https://vast-sands-85280.herokuapp.com/proker/${id}`),
          axios.get('https://vast-sands-85280.herokuapp.com/divisi')
        ])
      ).map((r) => r);

      const [prokersResult, prokerResult] = await Promise.all(result);

      setProkers(prokersResult);
      setProker(prokerResult);
      isFetching(false);
    };

    fetchData();
  }, []);

  console.log('from service', prokers, proker);

  return { prokers, proker, fetching };
};

export default useProkerData;
