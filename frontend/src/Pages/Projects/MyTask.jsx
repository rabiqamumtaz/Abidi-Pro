import React, { useState } from "react";
import AddTaskDrawer from "../../Components/addTaskModal";
import { FaSortDown, FaPlus } from "react-icons/fa";
import SearchBar from "../../Components/SearchBar";
import MyTasksTable from "../../Components/MyTaskTable";

const MyTask = () => {
  const [tasks, setTasks] = useState([
    {
      name: "Design Homepage",
      description: "Create wireframes & UI for homepage.",
      startDate: "2024-05-01",
      endDate: "2024-05-10",
      assignedBy: "Alice Johnson",
      priority: "High",
      status: "In Progress",
    },
    {
      name: "API Integration",
      description: "Integrate payment gateway API.",
      startDate: "2024-05-05",
      endDate: "2024-05-15",
      assignedBy: "Bob Smith",
      priority: "Medium",
      status: "Pending",
    },
    {
      name: "Database Migration",
      description: "Move data to new cloud database.",
      startDate: "2024-05-08",
      endDate: "2024-05-20",
      assignedBy: "Charlie Davis",
      priority: "High",
      status: "Completed",
    },
    {
      name: "Testing Phase 1",
      description: "Conduct initial functionality tests.",
      startDate: "2024-05-12",
      endDate: "2024-05-18",
      assignedBy: "David Lee",
      priority: "Low",
      status: "In Progress",
    },
    {
      name: "Deploy to Staging",
      description: "Deploy latest build to staging environment.",
      startDate: "2024-05-15",
      endDate: "2024-05-22",
      assignedBy: "Eve Thompson",
      priority: "Medium",
      status: "Pending",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const CustomTopBar = ({ openModal }) => {
    return (
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <SearchBar />

        <button className="flex items-center justify-center gap-2 bg-[#86B2AA] text-white text-sm px-4 py-2 rounded-md hover:brightness-110 w-full sm:w-auto">
          Sort By <FaSortDown className="text-xs" />
        </button>
      </div>
    );
  };
  return (
    // MainBody
    <div className="px-4 py-2 ">
      {/* roundercorner main Content */}
      <div className="p-8 rounded-xl bg-primary">
        <div className="bg-white px-8 py-4 font-semibold rounded-lg">
          Project
        </div>
        {/* attendance summary card view horizontal */}
        <div className="my-6">
          <MyTasksTable setTasks={setTasks} tasks={tasks}>
            <CustomTopBar openModal={() => setShowModal(true)} />
          </MyTasksTable>
        </div>
        <AddTaskDrawer isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default MyTask;
