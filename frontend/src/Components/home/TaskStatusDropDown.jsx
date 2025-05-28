import React, { useState } from 'react';

const TaskStatusDropDown = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statuses = ['InProgress', 'Hold', 'UnderReview', 'Completed'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusChange = (newStatus) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  const statusColor = {
    Completed: 'bg-green-100 text-green-800',
    InProgress: 'bg-slate-500 text-white',
    Hold: 'bg-red-500 text-white',
    UnderReview: 'bg-yellow-500 text-white',
  };

  return (
    <div className="relative w-full h-full text-left">
      {/* Status Button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
        className={`w-full h-full flex items-center justify-center whitespace-nowrap cursor-pointer px-3 py-1 rounded-sm ${statusColor[status] || 'bg-slate-500 text-white'}`}
      >
        {status}
      </div>

      {/* Dropdown */}
      {isOpen && (
        
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10  overflow-visible">
          {statuses.map((s) => (
            <div
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(s);
              }}
              className="w-full px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskStatusDropDown;
