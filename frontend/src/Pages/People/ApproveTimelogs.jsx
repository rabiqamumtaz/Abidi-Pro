import React, { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ApproveTimelogs = () => {
  const timeSheets = [
    {
      id: "current",
      data: [
        {
          name: "Alice",
          date: "10-02-2024",
          checkinTime: "3:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "7",
          status: "Approved",
        },
        {
          name: "Bob",
          date: "11-02-2024",
          checkinTime: "2:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "8",
          status: "Approved",
        },
        {
          name: "Carol",
          date: "12-02-2024",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied",
        },
      ],
    },
    {
      id: "previous",
      data: [
        {
          name: "Alice",
          date: "02-01-2025",
          checkinTime: "2:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "8",
          status: "Approved",
        },
        {
          name: "Bob",
          date: "05-01-2025",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied",
        },
      ],
    },
  ];

  const [activeSheet, setActiveSheet] = useState("current");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [editableRows, setEditableRows] = useState({});
  const [data, setData] = useState(
    timeSheets.find((sheet) => sheet.id === activeSheet)?.data || []
  );

  const parseDate = (dateStr) => {
    const [dd, mm, yyyy] = dateStr.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB").split("/").join("-");
  };

  const filteredData = selectedDate
    ? data.filter(
        (item) => formatDate(parseDate(item.date)) === formatDate(selectedDate)
      )
    : data;

  const handleNavigation = (direction) => {
    const newSheet = direction === "previous" ? "previous" : "current";
    setActiveSheet(newSheet);
    setData(timeSheets.find((sheet) => sheet.id === newSheet)?.data || []);
  };

  const handleEdit = (index) => {
    setEditableRows({ ...editableRows, [index]: true });
  };

  const handleSave = (index, newHours) => {
    const updatedData = [...data];
    updatedData[index].totalHours = newHours;
    setData(updatedData);
    setEditableRows({ ...editableRows, [index]: false });
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...data];
    updatedData[index].status = newStatus;
    setData(updatedData);
  };

  return (
    <div className="min-h-screen bg-primary p-4 m-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 bg-white p-4 rounded-md">
        <h2 className="text-base sm:text-lg font-semibold text-black mx-4">
          Approve Timelogs
        </h2>

        <div className="flex flex-wrap items-center gap-3 mx-4">
          <button
            className={`px-2 py-1 rounded ${
              activeSheet === "previous"
                ? "bg-background text-heading"
                : "bg-gray-200"
            }`}
            onClick={() => handleNavigation("previous")}
          >
            {"<"}
          </button>

          <div className="relative">
            <button
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <IoCalendarNumberOutline size={20} />
            </button>

            {showCalendar && (
              <div className="absolute z-50 mt-2 bg-white shadow-lg rounded">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>

          <button
            className={`px-2 py-1 rounded ${
              activeSheet === "current"
                ? "bg-background text-heading"
                : "bg-gray-200"
            }`}
            onClick={() => handleNavigation("current")}
          >
            {">"}
          </button>
        </div>

        <span className="text-sm text-black mx-4">Submitted Hours | 00:00</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSheet + (selectedDate?.toString() || "")}
            initial={{ x: activeSheet === "current" ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: activeSheet === "current" ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <table className="min-w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  {[
                    "Name",
                    "Date",
                    "Checkin",
                    "Checkout",
                    "Hours",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="p-3 font-medium border-r last:border-none border-gray-300"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.checkinTime}</td>
                    <td className="p-3">{item.checkoutTime}</td>
                    <td className="p-3">
                      {editableRows[index] ? (
                        <input
                          type="number"
                          defaultValue={item.totalHours}
                          className="w-16 p-1 border rounded text-sm"
                          onBlur={(e) => handleSave(index, e.target.value)}
                        />
                      ) : (
                        item.totalHours
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <MdOutlineModeEdit
                          className="text-grey-600 cursor-pointer hover:scale-110"
                          onClick={() => handleEdit(index)}
                          title="Edit Hours"
                        />
                        <FaCheck
                          className="text-green-600 cursor-pointer hover:scale-110"
                          onClick={() => handleStatusChange(index, "Approved")}
                          title="Approve"
                        />
                        <RxCross1
                          className="text-red-600 cursor-pointer hover:scale-110"
                          onClick={() => handleStatusChange(index, "Denied")}
                          title="Decline"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApproveTimelogs;
