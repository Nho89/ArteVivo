import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

//Get

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createBook = async (data) => {
    try {
        // const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.post(`${API_URL}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateBook = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBook = async (id) => {
    try {
        // const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.delete(`${API_URL}${id}`, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}