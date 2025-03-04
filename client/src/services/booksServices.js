import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/books/';

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

