import React, { useRef, useState, useEffect } from "react";
import { FiMoreVertical, FiTrash2, FiGift } from "react-icons/fi";

const birthdays = [
  {
    name: "Sarah Johnson",
    date: "May 12, 2025",
    day: "Monday",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "David Smith",
    date: "May 14, 2025",
    day: "Wednesday",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Emma Davis",
    date: "May 18, 2025",
    day: "Sunday",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    color: "bg-yellow-100 text-yellow-800",
  },
];

const UpcomingBirthdaysCard = ({ onDelete }) => {
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
      {/* Floating Icon (🎂 → React Icon) */}
      <div className="absolute -top-4 left-4 bg-pink-100 text-pink-700 w-10 h-10 flex items-center justify-center rounded-md shadow z-10 text-xl">
        <FiGift />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-heading">Upcoming Birthdays</h2>
          <p className="text-sm text-cardDescription font-medium">Celebrate your team!</p>
        </div>

        {/* Menu */}
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

      {/* List of Birthdays */}
      <ul className="space-y-3">
        {birthdays.map((b, index) => (
          <li
            key={index}
            style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            className={`rounded-lg p-3 flex items-center bg-primary justify-between group transition ${b.color}`}
          >
            <div className="flex items-center gap-3">
              <img
                src={b.avatar}
                alt={b.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-heading">{b.name}</div>
                <div className="text-xs text-text">
                  {b.date} <span className="mx-1 text-cardDescription">|</span> {b.day}
                </div>
              </div>
            </div>

            {/* Hover Action */}
            <button className="hidden group-hover:flex items-center gap-1 text-xs bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 text-gray-700 transition">
              <FiGift className="w-4 h-4 text-pink-600" />
              Send Wish
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingBirthdaysCard;
