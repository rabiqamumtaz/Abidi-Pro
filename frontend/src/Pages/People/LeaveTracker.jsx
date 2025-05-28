import React, { useState } from "react";
import AttendanceCard from "../../Components/AttendanceCard";
import {
  FaUmbrellaBeach,
  FaUserFriends,
  FaHospital,
  FaTools,
} from "react-icons/fa";
import { HiOutlineUserRemove } from "react-icons/hi";
import { DropDownPicker } from "../../Components/DropDownPicker";
import HolidayTable from "../../Components/HolidayTable";
import ApplyLeaveModal from "../../Components/LeaveModal";
import StatusDropDown from "../../Components/StatusDropDown";
const LeaveTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [page, setPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(true);

  const leaveRecord = [
    {
      date: "12/5/2025",
      leaveType: "Sick Leave",
      reason: "Illness",
      duration: "2 days",
      status: "Approved",
    },
    {
      date: "11/20/2025",
      leaveType: "Casual Leave",
      reason: "Personal Work",
      duration: "1 day",
      status: "Pending",
    },
  ];

  const [departmentLeaveRecord, setDepartmentLeaveRecord] = useState([
    {
      date: "12/5/2025",
      id: "2443",
      name: "joseph",
      email: "joseph@abidisolutions.com",
      leaveType: "Sick Leave",
      reason: "Illness",
      duration: "2 days",
      status: "Approve",
    },
    {
      date: "11/20/2025",
      id: "2446",
      name: "kamran",
      email: "kamran@abidisolutions.com",
      leaveType: "Sick Leave",
      reason: "Personal Work",
      duration: "10 day",
      status: "Reject",
    },
  ]);
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
    <div className="px-4 py-2 ">
      {/* roundercorner main Content */}
      <div className="p-8 rounded-xl bg-primary">
        {/* LeaveSummaryDiv */}
        <div className="mt-3 mb-4 bg-background px-6 py-1 rounded-md text-sm font-medium">
          <div className="flex flex-col items-center sm:flex sm:flex-row sm:justify-between sm:items-center p-4 ">
            <div>
              <div className="px-2 text-sm md:text-2xl sm:text-xl">
                Leave Summary
              </div>
              <div className="">
                <h1 className="px-2 text-xs font-light mt-3 ml-1">
                  Available Leaves : 02
                </h1>
                <h1 className="px-2 text-xs font-light mt-2 ml-1 ">
                  Booked Leaves : 20
                </h1>
              </div>
            </div>
            <button
              onClick={() => setIsOpen((i) => !i)}
              className="bg-[#76FA9E] h-8 px-4 mt-4  rounded-lg text-xs"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* upcoming holidays and leave */}
        <div className="p-4 mt-3 bg-background px-6 pb-8 rounded-md text-sm font-semibold">
          <h1 className="my-2 mb-6">Upcoming Holidays And Leaves</h1>
          <HolidayTable />
        </div>
        {/* past holidays and leave */}
        <div className="p-4 mt-3 bg-background px-6 pb-8 rounded-md text-sm font-semibold">
          <h1 className="my-2 mb-6">Past Holidays And Leaves</h1>
          {/* <DropDownPicker options={["holidays", "leave", "leave and holidays"]} /> */}
          <HolidayTable />
        </div>
      </div>
      <ApplyLeaveModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default LeaveTracker;
