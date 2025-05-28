import React from 'react';
import { IoClose } from 'react-icons/io5';

const TaskDetailModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>

      {/* Slide-in Panel */}
      <div className="fixed top-0 right-0 w-full sm:w-1/2 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto transition-transform duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-semibold">Task Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <strong>Title:</strong>
            <p>{task.title}</p>
          </div>
          <div>
            <strong>Description:</strong>
            <p>{task.description}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <strong>Start Date:</strong>
              <p>{task.startDate}</p>
            </div>
            <div>
              <strong>End Date:</strong>
              <p>{task.endDate}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <strong>Assigned To:</strong>
              <p>{task.assignee}</p>
            </div>
            <div>
              <strong>Assigned By:</strong>
              <p>{task.assignedBy}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <strong>Priority:</strong>
              <p>{task.priority}</p>
            </div>
            <div>
              <strong>Status:</strong>
              <p>{task.status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailModal;
