// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://54.206.185.32/v1';

export const collectionService = {
  async getCollections(params = {}) {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async getAllCollections() {
    try {
      let allCollections = [];
      let currentPage = 1;
      let hasMorePages = true;
      
      // First request to get total pages
      const firstResponse = await this.getCollections({ page: 1, limit: 100 });
      allCollections = [...firstResponse.data];
      
      const totalPages = firstResponse.pagination.totalPages;
      
      // Fetch remaining pages if any
      while (currentPage < totalPages) {
        currentPage++;
        const response = await this.getCollections({ 
          page: currentPage,
          limit: 100
        });
        allCollections = [...allCollections, ...response.data];
      }

      return {
        data: allCollections,
        totalCount: allCollections.length
      };
    } catch (error) {
      console.error('Error fetching all collections:', error);
      throw error;
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