// GridLayout.jsx
import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';

const GridLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    color: [],
    occasion: [],
    type: [],
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 60000 });
  const [sort, setSort] = useState("default");

  // Default filters configuration
  const defaultFilters = {
    color: ["Gold", "Silver"],
    occasion: ["Party", "Formal", "Traditional"],
    type: ["Modern", "Ethnic"]
  };

  const handleFilterChange = (category, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(prev => ({
      ...prev,
      max: parseInt(e.target.value)
    }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filterContext = {
    activeFilters,
    setActiveFilters,
    priceRange,
    setPriceRange,
    sort,
    setSort,
    defaultFilters,
    handleFilterChange,
    handlePriceRangeChange,
    handleSortChange
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
          <div className="pt-16 h-full overflow-y-auto">
            <FilterSidebar
              defaultFilters={defaultFilters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <div className={`
          fixed inset-0 z-50 lg:hidden transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Filters</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-64px)]">
              <FilterSidebar
                defaultFilters={defaultFilters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
              />
            </div>
          </aside>
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 pt-20">
          <Outlet context={filterContext} />
        </main>
      </div>
    </div>
  );
};

export default GridLayout;
