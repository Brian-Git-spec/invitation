import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://127.0.0.1:5000/api';

  console.log("API_URL =", API_URL);

export const sendInvitation = async (name: string, relationship: string) => {
    const response = await axios.post(`${API_URL}/invite`, { name, relationship });
    return response.data;
};
