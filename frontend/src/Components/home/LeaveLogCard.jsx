import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiTrash2, FiCalendar } from "react-icons/fi"; // React Icons
import { FaUmbrellaBeach } from "react-icons/fa";

const leaveLogs = [
  {
    name: "Paul Richards",
    date: "May 1, 2025",
    type: "Sick Leave",
    status: "Approved",
  },
  {
    name: "Anita Gomez",
    date: "May 3, 2025",
    type: "Casual Leave",
    status: "Pending",
  },
  {
    name: "Liam Wong",
    date: "May 6, 2025",
    type: "Work From Home",
    status: "Approved",
  },
];

const LeaveLogCard = ({ onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative bg-background rounded-xl shadow-md p-5 pt-10 w-full">
      {/* Floating Icon (React Icon replacing emoji) */}
      <div className="absolute -top-4 left-4 bg-blue-100 text-blue-700 w-10 h-10 flex items-center justify-center rounded-md shadow z-90 text-lg">
        <FaUmbrellaBeach className="text-xl" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-heading">Leave Logs</h2>
          <p className="text-sm text-cardDescription">Track your leave history</p>
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

      {/* Leave Logs */}
      <ul className="space-y-2 text-sm">
        {leaveLogs.map((log, index) => (
          <li
            key={index}
            style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            className={`p-3 rounded flex justify-between items-center`}
          >
            <div className="flex flex-col">
              <span className="font-semibold text-text">{log.name}</span>
              <span className="text-xs text-description">{log.date}</span>
            </div>
            <div className="flex flex-col text-right text-xs">
              <span className="font-medium text-text">{log.type}</span>
              <span
                className={`${
                  log.status === "Approved"
                    ? "text-green-700"
                    : "text-yellow-800"
                }`}
              >
                {log.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveLogCard;
