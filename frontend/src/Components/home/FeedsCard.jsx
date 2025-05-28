import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiTrash2, FiActivity } from "react-icons/fi"; // All icons from React Icons

const feedsData = [
  {
    message: "Your request was approved from admin",
    action: "View Status",
    actionType: "status",
  },
  {
    message: "Your log request was approved by project manager",
  },
  {
    message: "You have a message",
    description: "Hi, Paul, our new project would start from.....",
    action: "Check-in",
    actionType: "checkin",
  },
  {
    message: "You have not checked in yet.",
  },
];

const FeedsCard = ({ onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown on outside click
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
      {/* Icon top left (replaced emoji with FiActivity icon) */}
      <div className="absolute -top-4 left-4 bg-green-200 text-green-800 w-10 h-10 flex items-center justify-center rounded-md shadow z-99">
        <FiActivity className="text-xl" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg text-text font-semibold">Feeds</h2>
          <p className="text-cardDescription text-sm font-medium">4+ unread messages</p>
        </div>

        {/* Custom Dropdown Menu */}
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

      {/* Feed list */}
      <ul className="space-y-2 text-sm">
        {feedsData.map((item, index) => (
          <li
            key={index}
            style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            className="bg-primary rounded px-4 py-3 flex items-center justify-between gap-3"
          >
            {/* Message + optional description */}
            <div className="min-w-0">
              <span className="font-medium text-text">{item.message}</span>
              {item.description && (
                <div className="text-description text-sm">{item.description}</div>
              )}
            </div>

            {/* Action button */}
            {item.action && (
              <button
                className={`text-xs px-3 py-1 rounded font-medium shrink-0 ${
                  item.actionType === "status"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.action}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedsCard;
