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

export const getUsers = async () =>{
    try {
        const response = await axios.get(`${API_URL}`);
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

export const getUsersByRole = async (role) => {
    try {
        const response = await axios.get(`${API_URL}?role=${role}`);
        return response.data;
    } catch (error) {
        throw error;
    
}}

export const deleteUser = async (id, token) => {
    try {
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.delete(`${API_URL}${id}`, { headers });
    } catch (error) {
        throw error;
    }
}