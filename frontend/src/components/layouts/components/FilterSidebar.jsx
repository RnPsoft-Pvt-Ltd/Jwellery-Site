import React from 'react';
import { Sliders, X } from 'lucide-react';

const FilterSidebar = ({ 
  defaultFilters,
  activeFilters,
  onFilterChange,
  priceRange,
  onPriceRangeChange,
  className,
  onMobileClose 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={onMobileClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Price Range Filter */}
        <div className="border-b pb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium">Price Range</h3>
          </div>
          <input
            type="range"
            min="0"
            max="60000"
            value={priceRange.max}
            onChange={onPriceRangeChange}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">₹{priceRange.min}</span>
            <span className="text-gray-600">₹{priceRange.max}</span>
          </div>
        </div>

        {/* Category Filters */}
        {Object.entries(defaultFilters).map(([category, options]) => (
          <div key={category} className="border-b pb-6 last:border-b-0">
            <h3 className="font-medium capitalize mb-4">{category}</h3>
            <div className="space-y-3">
              {options
                .filter((option) => !option.toLowerCase().includes('gold'))
                .map((option) => (
                  <label key={option} className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-2 border-gray-300 rounded appearance-none checked:bg-black checked:border-black transition-colors cursor-pointer"
                        checked={activeFilters[category].includes(option)}
                        onChange={() => onFilterChange(category, option)}
                      />
                      <div className="absolute text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 check-icon checked:opacity-100">
                        ✓
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-black transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;