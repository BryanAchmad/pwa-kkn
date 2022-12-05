import { useState } from 'react';
import axios from './axios';

export const login = async (data) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  try {
    const response = await axios.post('/login', data);
    console.log(response);
    if (response) {
      setUser(response);
      setError(null);
    }
  } catch (e) {
    console.log('error Auth', e);
    setError(e);
  }
  return { user, error };
};
