import React, { useState } from 'react';

const ExportPopup = ({ onClose, onExport }) => {
  const [selectedOption, setSelectedOption] = useState('selectedRows'); // State to track selected option

  const handleExport = (option) => {
    onExport(option);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[30rem]">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">How would you like to export?</h2>
        <div className="space-y-2">
          {/* Option 1: Selected Rows Only */}
          <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <input
              type="radio"
              name="exportOption"
              value="selectedRows"
              checked={selectedOption === 'selectedRows'}
              onChange={() => setSelectedOption('selectedRows')}
              className="form-radio h-5 w-5 text-blue-500 dark:text-blue-400"
            />
            <span className="dark:text-gray-200">Selected Rows Only</span>
          </label>

          {/* Option 2: Data Within the Selected Date Range */}
          <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <input
              type="radio"
              name="exportOption"
              value="dateRange"
              checked={selectedOption === 'dateRange'}
              onChange={() => setSelectedOption('dateRange')}
              className="form-radio h-5 w-5 text-blue-500 dark:text-blue-400"
            />
            <span className="dark:text-gray-200">Data Within the Selected Date Range</span>
          </label>

          {/* Option 3: All Data on This Table */}
          <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <input
              type="radio"
              name="exportOption"
              value="allData"
              checked={selectedOption === 'allData'}
              onChange={() => setSelectedOption('allData')}
              className="form-radio h-5 w-5 text-blue-500 dark:text-blue-400"
            />
            <span className="dark:text-gray-200">All Data on This Table</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleExport(selectedOption)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPopup;