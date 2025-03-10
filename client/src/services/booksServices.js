import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

//Get

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books/`);
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

export const getBookByStudentId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/books/student/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createBook = async (data) => {
    try {
       
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

export const updateBookAvailability = async (id, newQuantity) => {
    try {
        const response = await axios.patch(`${API_URL}/books/${id}/`, {
            quantity_available: newQuantity
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar disponibilidad:", error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        
        const response = await axios.delete(`${API_URL}${id}`, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}