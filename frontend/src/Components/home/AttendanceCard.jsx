import React, { useState, useEffect, useRef } from "react";
import { GoGraph } from "react-icons/go";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";

const AttendanceCard = ({ weeklyData = [], onDelete }) => {
  const totalHours = weeklyData.reduce((sum, val) => sum + val.hours, 0);
  const maxBarHeight = 100;
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
    <div className="w-full max-w-md mx-auto bg-background rounded-2xl shadow p-4 sm:p-6 relative">
      {/* Top Icon */}
      <div className="absolute -top-5 left-5 bg-blue-200 text-green-800 w-10 h-10 flex items-center justify-center rounded-md shadow z-99">
        <GoGraph />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg mt-5 text-text font-semibold">Weekly Attendance</h2>
          <p className="text-cardDescription text-sm font-medium">{totalHours} total hours</p>
        </div>

        {/* Custom Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md z-50">
              <button
                onClick={() => {
                  onDelete?.();
                  setMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-primary to-indigo-100 rounded-xl px-2 py-4 sm:px-4"
      style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}>
        <div className="flex items-end justify-between h-36 sm:h-44 gap-2 sm:gap-3">
          {weeklyData.map(({ day, hours }, i) => {
            let color = "bg-gray-300";
            if (hours <= 2) color = "bg-red-500";
            else if (hours >= 7) color = "bg-green-600";
            else color = "bg-indigo-400";

            const barHeight = Math.min((hours / 10) * maxBarHeight, maxBarHeight);

            return (
              <div key={i} className="flex flex-col items-center justify-end flex-1">
                <div
                  className={`w-2 sm:w-3 ${color} rounded transition-all duration-300`}
                  style={{ height: `${barHeight}px` }}
                ></div>
                <div className="mt-1 text-center leading-tight">
                  <span className="block text-[10px] sm:text-xs font-semibold text-text">
                    {day}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-heading">
                    {hours}h
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
