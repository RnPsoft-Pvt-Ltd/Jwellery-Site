// // src/components/Search/SearchBar.jsx
// import React from 'react';
// import { Search } from 'lucide-react';

// const SearchBar = ({ 
//   value, 
//   onChange, 
//   placeholder = "Search...",
//   className = "" 
// }) => {
//   return (
//     <div className="relative w-full">
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <Search className="h-5 w-5 text-gray-400" />
//       </div>
//       <input
//         type="text"
//         className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;


// src/components/search/SearchBar.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../../utils/useSearch';
import { SearchResults } from './SearchResults';

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { query, setQuery, results, isLoading, error } = useSearch();

  return (
    <div className="relative">
      <div className="flex items-center">
        <div
          className={`flex items-center ${
            isExpanded ? 'w-64' : 'w-10'
          } transition-all duration-300`}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            <Search className="text-white" size={20} />
          </button>
          {isExpanded && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-2 w-full bg-transparent text-white border-b border-white focus:outline-none"
              autoFocus
            />
          )}
        </div>
      </div>
      {isExpanded && (
        <SearchResults
          results={results}
          isLoading={isLoading}
          error={error}
          onResultClick={() => {
            setIsExpanded(false);
            setQuery('');
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;