import React, { useState } from "react";

const AddHolidayModal = ({isOpen,setIsOpen}) => {

  return (
    <>
{/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-[9999] flex justify-end">
          {/* Modal Panel */}
          <div className="w-75 sm:w-1/2 bg-white h-full p-6 shadow-lg rounded-l-lg relative z-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Holiday</h2>
              <button
                className="text-gray-500 hover:text-black text-xl"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Holiday Type</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Select type</option>
                  <option>Religious Holiday</option>
                  <option>Strike</option>
                  <option>National Holiday</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date*</label>
                <input type="date" className="w-full border rounded px-3 py-2" />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Email ID</label>
                <input type="email" className="w-full border rounded px-3 py-2" />
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Reason for leave</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3}></textarea>
              </div> */}

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

export default AddHolidayModal;
