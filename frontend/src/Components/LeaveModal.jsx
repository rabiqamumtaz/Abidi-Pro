import React, { useState } from "react";
import api from "../axios";
import { toast } from "react-toastify";
 
const ApplyLeaveModal = ({ isOpen, setIsOpen }) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!leaveType || !startDate || !endDate) {
      toast.error("Please fill all required fields.");
      return;
    }
 
    try {
      const payload = {
        leaveType,
        startDate,
        endDate,
        reason,
      };
 
      await api.post("/leaves", payload);
      toast.success("Leave request submitted");
      setIsOpen(false);
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request");
    }
  };
 
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-[9999] flex justify-end">
          <div className="w-75 sm:w-1/2 bg-white h-full p-6 shadow-lg rounded-l-lg relative z-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Apply Leave</h2>
              <button
                className="text-gray-500 hover:text-black text-xl"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>
 
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Leave Type*
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Earned">Earned Leave</option>
                  <option value="Maternity">Maternity Leave</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date*
                </label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date*
                </label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason for leave
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
 
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
 
export default ApplyLeaveModal;
 
 