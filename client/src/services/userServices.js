import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';
//http://localhost:3000/users
export const login = async (userData) =>{
    try {
        // const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.post(`${API_URL}/login/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const userRegister = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () =>{
    try {
        const response = await axios.get(`${API_URL}/users/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsersByRole = async (role) => {
    try {
        const response = await axios.get(`${API_URL}/users/?role=${role}/`);
        return response.data;
    } catch (error) {
        throw error;
    
}}

export const deleteUser = async (id) => {
    try {
        // const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.delete(`${API_URL}/users/${id}/`);
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.patch(`${API_URL}/users/${id}/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

