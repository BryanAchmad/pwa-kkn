import axios from './axios';

export const login = async (data) => {
    const { nim, pic } = data;
    const response = await axios.post('/login', {
        nim,
        pic
    });

    console.log(response);
    const token = response?.data?.access_token;
    if (token) {
        localStorage.setItem('user', JSON.stringify(response?.data));
    }

    return response.data;
};