import styles from './FilterBar.module.scss';
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
            {/* ...existing code... */}
          </select>
        );
      // ...existing code...
    }
  };

  // ...existing code...
  // Ví dụ sử dụng: <div className={styles.filterBar}>...</div>
};

export default FilterBar;
