import React, { useState } from 'react';

const FilterBar = ({
  filters = [],
  onFilterChange = () => {},
  onClear = () => {},
  className = ''
}) => {
  const [activeFilters, setActiveFilters] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (!value) {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onClear();
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const renderFilter = (filter) => {
    const { key, label, type, options, placeholder } = filter;

    switch (type) {
      case 'select':
        return (
          <select
            key={key}
            value={activeFilters[key] || ''}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="">{placeholder || `Chọn ${label}`}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div key={key} className="relative">
            <select
              multiple
              value={activeFilters[key] || []}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                handleFilterChange(key, values.length > 0 ? values : null);
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm min-h-[38px]"
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'date':
        return (
          <input
            key={key}
            type="date"
            value={activeFilters[key] || ''}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          />
        );

      case 'daterange':
        return (
          <div key={key} className="flex items-center space-x-2">
            <input
              type="date"
              value={activeFilters[`${key}_from`] || ''}
              onChange={(e) => handleFilterChange(`${key}_from`, e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              placeholder="Từ ngày"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              value={activeFilters[`${key}_to`] || ''}
              onChange={(e) => handleFilterChange(`${key}_to`, e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              placeholder="Đến ngày"
            />
          </div>
        );

      case 'number':
        return (
          <input
            key={key}
            type="number"
            value={activeFilters[key] || ''}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            placeholder={placeholder || label}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          />
        );

      case 'text':
      default:
        return (
          <input
            key={key}
            type="text"
            value={activeFilters[key] || ''}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            placeholder={placeholder || `Tìm ${label}`}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          />
        );
    }
  };

  const basicFilters = filters.filter(f => !f.advanced);
  const advancedFilters = filters.filter(f => f.advanced);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${className}`}>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
        {basicFilters.map(filter => (
          <div key={filter.key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {filter.label}
            </label>
            {renderFilter(filter)}
          </div>
        ))}
      </div>

      {/* Advanced Filters Toggle */}
      {advancedFilters.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <svg
              className={`w-4 h-4 mr-1 transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Bộ lọc nâng cao
          </button>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvanced && advancedFilters.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {advancedFilters.map(filter => (
            <div key={filter.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {filter.label}
              </label>
              {renderFilter(filter)}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Active Filters Count */}
        {hasActiveFilters && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {Object.keys(activeFilters).length} bộ lọc đang áp dụng
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.key === key || key.startsWith(f.key));
            if (!filter || !value) return null;

            let displayValue = value;
            if (filter.type === 'select' || filter.type === 'multiselect') {
              const option = filter.options?.find(opt => opt.value === value);
              displayValue = option?.label || value;
            }

            return (
              <span
                key={key}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {filter.label}: {Array.isArray(displayValue) ? displayValue.join(', ') : displayValue}
                <button
                  onClick={() => handleFilterChange(key, null)}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterBar;