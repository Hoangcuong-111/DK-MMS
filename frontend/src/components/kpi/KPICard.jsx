import React from 'react';

const KPICard = ({ title, value, unit, change, changeType = 'percentage', icon }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  // Determine if positive change is good or bad based on the metric
  const isGoodChange = (title.includes('hoàn thành') || title.includes('Tỉ lệ')) ? isPositive : isNegative;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          </div>
        </div>
        {icon && (
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="mt-4 flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${
            isGoodChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            so với kỳ trước
          </span>
        </div>
      )}
    </div>
  );
};

export default KPICard;