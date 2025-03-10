import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/courses/";
const ENROLLMENT_API_URL = "http://127.0.0.1:8000/api/enrollments/";

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
      const response = await axios.post(`${API_URL}`, data);
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
      const response = await axios.delete(`${API_URL}${id}`);
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
      const response = await axios.put(`${API_URL}${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
export const enrollInCourse = async (userId, courseId) => {
    try {
        const response = await axios.post(`${ENROLLMENT_API_URL}`, {student: userId, course: courseId});
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error al inscribirse en el curso:', error);
        throw error;
    }
};