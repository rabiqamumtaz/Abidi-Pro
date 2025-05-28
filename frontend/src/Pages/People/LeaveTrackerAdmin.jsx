import React, { useEffect, useState } from "react";
import api from "../../axios";
import StatusDropDown from "../../Components/StatusDropDown";
import { FaPlus } from "react-icons/fa";
import HolidayTable from "../../Components/HolidayTable";
import AddHolidayModal from "../../Components/AddHolidayModal";

const LeaveTrackerAdmin = () => {
  const [departmentLeaveRecord, setDepartmentLeaveRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leaves");
      const formatted = response.data.data.map((item) => ({
        id: item._id,
        date: new Date(item.startDate).toLocaleDateString(),
        name: item.employeeName,
        email: item.email,
        leaveType: item.leaveType,
        reason: item.reason || "-",
        duration: `${Math.ceil(
          (new Date(item.endDate) - new Date(item.startDate)) /
            (1000 * 60 * 60 * 24) +
            1
        )} days`,
        status: item.status || "Pending",
      }));
      setDepartmentLeaveRecord(formatted);
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      await api.put(`/leaves/${leaveId}/status`, { status: newStatus });
      await fetchLeaves();
    } catch (error) {
      console.error(
        "Failed to update status:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    // MainBody
    <div className="px-4 py-2">
      {/* roundercorner main Content */}
      <div className="p-8 rounded-xl bg-primary">
        {/* attendance summary card view horizontal */}

        <div className="mt-3 bg-background px-6 py-1  rounded-md text-sm font-medium">
          <div className="px-2 my-4 text-lg">Applied Leave</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-primary rounded-t-lg">
                <tr>
                  {[
                    "Date",
                    "Id",
                    "Name",
                    "Email",
                    "Leave Type",
                    "Duration In Days",
                    "Reason",
                    "Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className={`p-3 font-medium text-white whitespace-nowrap border-r last:border-none border-gray-300
            ${index === 0 ? "rounded-tl-lg" : ""}
            ${index === 7 ? "rounded-tr-lg" : ""}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departmentLeaveRecord.length > 0
                  ? departmentLeaveRecord.map((task, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 whitespace-nowrap">{task.date}</td>
                        <td className="p-3 whitespace-nowrap">{task.id}</td>
                        <td className="p-3 whitespace-nowrap">{task.name}</td>
                        <td className="p-3 whitespace-nowrap">{task.email}</td>
                        <td className="p-3 whitespace-nowrap">
                          {task.leaveType}
                        </td>
                        <td className="p-3 whitespace-nowrap">{task.reason}</td>
                        <td className="p-3 whitespace-nowrap">
                          {task.duration}
                        </td>
                        {/* <td className="p-3 whitespace-nowrap">{task.status}</td> */}
                        <td>
                          <StatusDropDown
                            className="p-3 whitespace-nowrap"
                            status={task.status}
                            onChange={(newStatus) => {
                              setDepartmentLeaveRecord((records) =>
                                records.map((row, i) =>
                                  i === index
                                    ? { ...row, status: newStatus }
                                    : row
                                )
                              );
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  : [...Array(8)].map((_, index) => (
                      <tr key={index} className="border-b">
                        {[...Array(7)].map((__, colIndex) => (
                          <td key={colIndex} className="p-3">
                            <div className="h-4 bg-gray-100 rounded" />
                          </td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 mt-3 bg-background px-6 pb-8 rounded-md text-sm font-semibold">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <h1 className="text-base sm:text-lg font-semibold">
              Upcoming Holidays And Leaves
            </h1>
            <button
              onClick={() => setIsOpen((i) => !i)}
              className="flex items-center gap-2 bg-[#86B2AA] text-white text-sm px-4 py-2 rounded-md hover:brightness-110 w-full sm:w-auto"
            >
              <FaPlus /> Add Holiday
            </button>
          </div>

          <HolidayTable />
        </div>
        <AddHolidayModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default LeaveTrackerAdmin;
