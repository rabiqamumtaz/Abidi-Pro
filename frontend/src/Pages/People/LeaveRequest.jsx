import React, { useState, useEffect } from "react";
import {
  FaUmbrellaBeach,
  FaUserFriends,
  FaHospital,
} from "react-icons/fa";
import { HiOutlineUserRemove } from "react-icons/hi";
import ApplyLeaveModal from "../../Components/LeaveModal";
import api from "../../axios";
 
const LeaveRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leaveRecord, setLeaveRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
 
  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leaves"); // GET from backend
      const data = response.data.data;
 
      const formatted = data.map((leave) => ({
        date: new Date(leave.startDate).toLocaleDateString(),
        leaveType: leave.leaveType,
        reason: leave.reason || "-",
        duration: `${Math.ceil(
          (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24) + 1
        )} days`,
        status: leave.status || "Pending",
      }));
 
      setLeaveRecord(formatted);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchLeaves();
  }, []);
 
  const leaveData = [
    {
      icon: <HiOutlineUserRemove />,
      label: "Absents",
      available: 0,
      badgeColor: "bg-red-400",
    },
    {
      icon: <FaUmbrellaBeach />,
      label: "Holidays",
      available: 10,
      badgeColor: "bg-yellow-300",
    },
    {
      icon: <FaUserFriends />,
      label: "Personal",
      available: 10,
      badgeColor: "bg-green-500",
    },
    {
      icon: <FaHospital />,
      label: "Sick Leave",
      available: 0,
      badgeColor: "bg-blue-500",
    },
  ];
 
  return (
    // MainBody
    <div className='px-4 py-2 '>
      {/* roundercorner main Content */}
      <div className='p-8 rounded-xl bg-primary'>
       


                  
        <div className='flex flex-col mt-3 bg-background px-6 py-1 rounded-md text-sm font-medium'>
          <div className='px-2 my-4 text-lg'>Applied Leave</div>
            {loading ? (
            <div className="text-white px-4">Loading...</div>
          ) : errorMsg ? (
            <div className="text-red-400 px-2">{errorMsg}</div>
          ) : leaveRecord.length === 0 ? (
            <div className="text-white px-4">No leave records found.</div>
          ):(
            <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-primary rounded-t-lg">
                <tr>
                  {["Date", "Leave Type", "Reason", "Duration In Day", "Status"].map((header, index) => (
                    <th
          key={index}
          className={`p-3 font-medium text-white whitespace-nowrap border-r last:border-none border-gray-300
            ${index === 0 ? "rounded-tl-lg" : ""}
            ${index === 4 ? "rounded-tr-lg" : ""}
          `}
        >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaveRecord.length > 0 ? (
                  leaveRecord.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">{item.date}</td>
                      <td className="p-3 whitespace-nowrap">{item.leaveType}</td>
                      <td className="p-3 whitespace-nowrap">{item.reason}</td>
                      <td className="p-3 whitespace-nowrap">{item.duration}</td>
                      <td className={`p-3 whitespace-nowrap text-center ${item.status == "Approved" ? 'bg-completed' : 'bg-slate-500 text-white'}rounded-sm `}>{item.status}</td>
                    </tr>
                  ))
                ) : (
                  [...Array(8)].map((_, index) => (
                    <tr key={index} className="border-b">
                      {[...Array(7)].map((__, colIndex) => (
                        <td key={colIndex} className="p-3">
                          <div className="h-4 bg-gray-100 rounded" />
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
              </>
          )}
        </div>
      </div>

 
      <ApplyLeaveModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
 
export default LeaveRequest;
 