// src/components/search/SearchResults.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchResults = ({ results, isLoading, error, onResultClick }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg">
      {results.map((result) => (
        <div
          key={result.id}
          className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
          onClick={() => {
            navigate(`/products/${result.id}`);
            onResultClick?.();
          }}
        >
          {result.image_url && (
            <img
              src={result.image_url}
              alt={result.name}
              className="w-12 h-12 object-cover rounded"
            />
          )}
          <div>
            <h3 className="font-medium text-gray-900">{result.name}</h3>
            <p className="text-sm text-gray-500">{result.description}</p>
            <p className="text-sm font-medium text-gray-900">Rs. {result.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
