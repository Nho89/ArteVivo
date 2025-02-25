import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

//Get

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

