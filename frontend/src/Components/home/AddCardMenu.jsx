import React, { useState, useRef, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const cardOptions = [
  { id: "feeds", label: "Feeds" },
  { id: "attendance", label: "Attendance" },
  { id: "holidays", label: "Holidays" },
  { id: "todo", label: "To-Do" },
  { id: "notes", label: "Notes"},
  { id: "recent activities", label: "Recent activities"},
  { id: "birthdays", label: "Upcoming Birthdays"},
  { id: "leavelog", label: "Leave Logs"},
  { id: "upcomingDeadlines", label: "Deadlines"},
  { id: "timeoffBalance", label: "Time Off Balance"},
  { id: "tasksAssignedToMe", label: "My Tasks"},
];

const AddCardMenu = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Button with text + icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition text-sm text-gray-700 font-medium"
      >
        More
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50">
          <ul className="py-1 text-sm text-gray-700">
            {cardOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onAdd(option.id);
                  setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCardMenu;
