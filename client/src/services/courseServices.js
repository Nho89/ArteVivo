import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/courses/";

export const getCourses = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el curso:', error);
    throw error;
  }
};

export const createCourse = async (data, token) => {
  if (token) {
    try {
      const headers = { 'Authorization': `Bearer ${token}` }
      const response = await axios.post(`${API_URL}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const deleteCourse = async (id, token) => {
  if (token) {
    try {
      const headers = { 'Authorization': `Bearer ${token}` }
      const response = await axios.delete(`${API_URL}${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const updateCourse= async (id, data, token) => {
  if (token) {
    try {
      const headers = { 'Authorization': `Bearer ${token}` }
      const response = await axios.put(`${API_URL}${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
export const enrollInCourse = async (userId, courseId) => {
    try {
        const response = await axios.post(`${API_URL}${courseId}/enroll/`, { user_id: userId });
        return response.data;
    } catch (error) {
        console.error('Error al inscribirse en el curso:', error);
        throw error;
    }
};