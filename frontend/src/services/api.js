// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/v1';

export const collectionService = {
  async getCollections(params = {}) {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }



};

export const categoryService = {
  async getCategories(params = {}) {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};