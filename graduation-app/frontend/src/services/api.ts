import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const sendInvitation = async (name: string, relationship: string) => {
    const response = await axios.post(`${API_URL}/invite`, { name, relationship });
    return response.data;
};