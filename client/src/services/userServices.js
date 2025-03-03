import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users/';
//http://localhost:3000/users
export const login = async (userData) =>{
    try {
        const response = await axios.post(`${API_URL}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const userRegister = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}