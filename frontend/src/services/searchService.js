// src/services/searchService.js
import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://localhost:5000';

class SearchService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/v1/search`,
    });
  }

  // Interceptor to add auth token for admin routes
  setupAuthInterceptor(getToken) {
    this.api.interceptors.request.use((config) => {
      if (config.url.startsWith('/admin')) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
  }

  // Public search endpoints
  async searchProducts(params = {}) {
    const response = await this.api.get('/products', { params });
    return response.data;
  }

  // Admin search endpoints
  async searchCustomers(params = {}) {
    const response = await this.api.get('/admin/customers', { params });
    return response.data;
  }

  async searchOrders(params = {}) {
    const response = await this.api.get('/admin/orders', { params });
    return response.data;
  }

  async searchCategories(params = {}) {
    const response = await this.api.get('/admin/categories', { params });
    return response.data;
  }

  async searchCoupons(params = {}) {
    const response = await this.api.get('/admin/coupons', { params });
    return response.data;
  }
}

export default new SearchService();