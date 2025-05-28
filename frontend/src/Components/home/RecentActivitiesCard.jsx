import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiTrash2, FiClock } from "react-icons/fi";

const recentActivities = [
  {
    id: 1,
    user: "Paul",
    action: "added a new task",
    time: "2 mins ago",
    color: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    user: "Sarah",
    action: "updated project status",
    time: "10 mins ago",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    user: "Admin",
    action: "deleted a holiday",
    time: "1 hour ago",
    color: "bg-red-100 text-red-700",
  },
];

const RecentActivitiesCard = ({ onDelete }) => {
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
      {/* Floating Icon */}
      <div className="absolute -top-4 left-4 bg-purple-100 text-purple-700 w-10 h-10 flex items-center justify-center rounded-md shadow z-10 text-xl">
        <FiClock />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg text-heading font-semibold">Recent Activities</h2>
          <p className="text-sm font-medium text-cardDescription">
            Logs of team actions & updates
          </p>
        </div>

        {/* Dropdown menu */}
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

      {/* Activity Items */}
      <ul className="space-y-3 text-sm">
        {recentActivities.map((item) => (
          <li
            key={item.id}
            style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            className={`${item.color} px-4 py-3 rounded-lg flex items-start gap-3`}
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full font-bold bg-white ring-1 ring-black text-lg">
              {item.user[0]}
            </div>
            <div>
              <p className="text-sm font-medium text-text">
                <span className="font-semibold">{item.user}</span> {item.action}
              </p>
              <span className="text-xs text-text">{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivitiesCard;
