// src/hooks/useSearch.js
import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import searchService from '../services/searchService';

export const useSearch = (searchType, defaultParams = {}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(defaultParams);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    total: 0
  });

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery && !Object.keys(filters).length) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = {
          q: debouncedQuery,
          page: pagination.currentPage,
          ...filters
        };

        let response;
        switch (searchType) {
          case 'products':
            response = await searchService.searchProducts(params);
            break;
          case 'customers':
            response = await searchService.searchCustomers(params);
            break;
          case 'orders':
            response = await searchService.searchOrders(params);
            break;
          case 'categories':
            response = await searchService.searchCategories(params);
            break;
          case 'coupons':
            response = await searchService.searchCoupons(params);
            break;
          default:
            throw new Error(`Invalid search type: ${searchType}`);
        }

        setResults(response.data);
        setPagination({
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.pages,
          total: response.pagination.total
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, filters, pagination.currentPage, searchType]);

  const setPage = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    error,
    pagination,
    setPage
  };
};