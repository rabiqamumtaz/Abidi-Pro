import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiTrash2, FiClock } from "react-icons/fi";

const upcomingDeadlines = [
  {
    task: "Submit weekly report",
    dueDate: "Due: May 24",
    action: "View Task",
  },
  {
    task: "Team check-in meeting",
    dueDate: "Due: May 25",
    action: "Join Meeting",
  },
  {
    task: "Complete security training",
    dueDate: "Due: May 28",
    action: "Start Now",
  },
];

const UpcomingDeadlinesCard = ({ onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative bg-background rounded-xl shadow-md p-5 pt-10 overflow-visible">
      {/* Icon top left */}
      <div className="absolute -top-4 left-4 bg-yellow-200 text-yellow-800 w-10 h-10 flex items-center justify-center rounded-md shadow z-99">
        <FiClock className="text-xl" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg text-text font-semibold">Upcoming Deadlines</h2>
          <p className="text-cardDescription text-sm font-medium">
            Tasks due this week
          </p>
        </div>

        {/* Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FiMoreVertical className="h-5 w-5 text-gray-600" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md z-50">
              <button
                onClick={() => {
                  onDelete();
                  setMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Delete Card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Deadlines List */}
      <ul className="space-y-2 text-sm">
        {upcomingDeadlines.map((item, index) => (
          <li
            key={index}
            style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            className="bg-primary rounded px-4 py-3 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <span className="font-medium text-text">{item.task}</span>
              <div className="text-description text-sm">{item.dueDate}</div>
            </div>

            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingDeadlinesCard;
