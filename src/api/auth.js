// import { useState } from 'react';
import axios from './axios';

// export const loginApi = (data) => {
//   console.log(data);
//   return axios.post('/login', data);
// };

export const login = async (data) => {
    const { nim, pic } = data;
    const response = await axios.post('/login', {
        nim,
        pic
    });

    const token = response?.data?.access_token;
    if (token) {
        localStorage.setItem('user', JSON.stringify(response?.data));
    }

    return response.data;
};

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  if(!user) {
    return {};
  }

  return JSON.parse(user);
}

// export const login = async (username, password) => {
//     const [user, setUser] = useState();
//     // const [error, setError] = useState();

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('/login', data);
//             console.log('login service', response);
//             if (response) {
//                 setUser(response);
//                 // setError(null);
//                 localStorage.setItem('user', response?.data);
//                 return response;
//             }
//         } catch (e) {
//             console.log('error Auth', e);
//             // setError(e);
//         }
//         return null;
//     };

//     const isAuthenticated = () => {
//         const userData = localStorage.getItem('user');
//         if (!userData) {
//             return {};
//         }

//         return userData;
//     };

//     return { handleLogin, getUser };
// };
