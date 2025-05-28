import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const users = [
    'Ahsan Khan',
    'Murtaza Mehmood',
    'Hammad Shaikh',
    'Adil Abbas Khuhro',
    'Syed Munawar Ali Tirmizi',
];

const AddTaskDrawer = ({ isOpen, onClose }) => {
    if (!isOpen) return null;


   const [assignTo, setAssignTo] = useState(null);
  const [assignBy, setAssignBy] = useState(null);

  const [queryTo, setQueryTo] = useState('');
  const [queryBy, setQueryBy] = useState('');

  const [showDropdownTo, setShowDropdownTo] = useState(false);
  const [showDropdownBy, setShowDropdownBy] = useState(false);

  const filteredUsersTo = users.filter((user) =>
    user.toLowerCase().includes(queryTo.toLowerCase())
  );
  const filteredUsersBy = users.filter((user) =>
    user.toLowerCase().includes(queryBy.toLowerCase())
  );

  const handleSelectTo = (user) => {
    setAssignTo(user);
    setShowDropdownTo(false);
  };

  const handleSelectBy = (user) => {
    setAssignBy(user);
    setShowDropdownBy(false);
  };

  const handleClearTo = () => {
    setAssignTo(null);
    setQueryTo('');
  };

  const handleClearBy = () => {
    setAssignBy(null);
    setQueryBy('');
  };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
            <div className="w-full sm:w-1/2 bg-white h-full shadow-lg flex flex-col p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Add Task</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">&times;</button>
                </div>

                {/* Form */}
                <form className="space-y-4 overflow-y-auto flex-1">
                    <input
                        type="text"
                        placeholder="Task Name"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="date"
                                placeholder="Start Date"
                                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
                        </div>
                        <div className="relative">
                            <input
                                type="date"
                                placeholder="End Date"
                                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
                        </div>
                    </div>

                    <textarea
                        placeholder="Description"
                        rows="3"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    ></textarea>

                     <div className="grid grid-cols-2 gap-4">
      {/* Assign To Field */}
      <div className="relative w-full max-w-sm">
        {!assignTo ? (
          <input
            type="text"
            value={queryTo}
            onChange={(e) => {
              setQueryTo(e.target.value);
              setShowDropdownTo(true);
            }}
            placeholder="Assign to"
            className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
          />
        ) : (
          <div className="flex items-center justify-between border rounded px-4 py-2 bg-gray-100">
            <span className="text-gray-800">{assignTo}</span>
            <button
              onClick={handleClearTo}
              className="text-sm text-blue-600 hover:underline"
            >
              Change
            </button>
          </div>
        )}

        {showDropdownTo && filteredUsersTo.length > 0 && !assignTo && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
            {filteredUsersTo.map((user, index) => (
              <li
                key={index}
                onClick={() => handleSelectTo(user)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {user}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Assign By Field */}
      <div className="relative w-full max-w-sm">
        {!assignBy ? (
          <input
            type="text"
            value={queryBy}
            onChange={(e) => {
              setQueryBy(e.target.value);
              setShowDropdownBy(true);
            }}
            placeholder="Assign by"
            className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
          />
        ) : (
          <div className="flex items-center justify-between border rounded px-4 py-2 bg-gray-100">
            <span className="text-gray-800">{assignBy}</span>
            <button
              onClick={handleClearBy}
              className="text-sm text-blue-600 hover:underline"
            >
              Change
            </button>
          </div>
        )}

        {showDropdownBy && filteredUsersBy.length > 0 && !assignBy && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
            {filteredUsersBy.map((user, index) => (
              <li
                key={index}
                onClick={() => handleSelectBy(user)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {user}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Priority"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
                            <option value="">Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskDrawer;
