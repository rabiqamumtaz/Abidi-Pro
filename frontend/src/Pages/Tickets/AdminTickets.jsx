import React, { useState } from "react";
import { Search, Clock, Filter, SortDesc, Plus } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import AdminRaiseTicketModal from "../../Pages/Tickets/AdminRaiseTicketModal";
import { useNavigate } from "react-router-dom";

const AdminTickets = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // ✅ modal state

  const navigate = useNavigate();

  const [tickets, setTickets] = useState([
    {
      id: "#0015",
      title: "Check in or check out issue",
      priority: "High Priority",
      priorityColor: "bg-red-100 text-red-700",
      date: "1 day ago",
      assignee: "Aliya",
      status: "In Progress",
    },
    {
      id: "#0016",
      title: "Request for Laptop Support",
      priority: "Low",
      priorityColor: "bg-green-100 text-green-700",
      date: "22 May 2025",
      assignee: "Aliya",
      status: "Opened",
    },
  ]);

  const handleNewTicketSubmit = (newTicket) => {
    setTickets((prev) => [...prev, newTicket]);
    setShowModal(false);
  };

  return (
    <div className="bg-primary p-6 min-h-screen rounded-2xl m-4">
      <div className=" p-6 overflow-auto">
        {/* Header Controls */}
        <div className="flex flex-col space-y-4 mb-5 bg-white rounded-lg px-4 py-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
            {/* Entries and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3 lg:mb-0">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <label className="text-sm text-heading whitespace-nowrap">
                  Show
                </label>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="text-sm px-2 py-1 text-heading bg-secondary rounded-md shadow-md"
                >
                  {[10, 25, 50].map((val) => (
                    <option key={val} value={val} className="text-gray-700">
                      {val}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-heading">entries</span>
              </div>

              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-0 px-3 py-1.5 rounded-md shadow-md w-full sm:w-64 text-sm bg-secondary text-description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white px-3 py-2 rounded hover:bg-[#4b7f7a] transition text-sm flex items-center gap-1 whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Ticket</span>
              </button>

              {/* Filter dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setFilterOpen(!filterOpen);
                    setSortOpen(false);
                  }}
                  className="p-2 rounded bg-primary text-white flex items-center space-x-1"
                  title="Filter"
                >
                  <Filter className="h-4 w-4" />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-20">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      High Priority
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Low Priority
                    </button>
                  </div>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setSortOpen(!sortOpen);
                    setFilterOpen(false);
                  }}
                  className="p-2 rounded bg-primary text-white flex items-center space-x-1"
                  title="Sort"
                >
                  <SortDesc className="h-4 w-4" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-20">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Newest
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Oldest
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4 w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300 w-1/3">
                    Ticket
                  </th>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300 w-1/3 text-center">
                    Assignee
                  </th>
                  <th className="p-3 font-medium text-gray-700 w-1/3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.length ? (
                  tickets.map((ticket, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      {/* Ticket Info */}
                      <td className="p-3 align-top">
                        <div className="font-medium text-gray-800">
                          {ticket.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                          <span className="text-gray-500">{ticket.id}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${ticket.priorityColor}`}
                          >
                            {ticket.priority}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            {ticket.date}
                          </span>
                        </div>
                      </td>

                      {/* Assignee */}
                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <FaUserCircle className="text-gray-600 w-6 h-6" />
                          <span>{ticket.assignee}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <div className="flex justify-end items-center gap-3">
                          <select className="border rounded px-2 py-1 text-xs text-gray-700">
                            <option>Opened</option>
                            <option>In Progress</option>
                            <option>Closed</option>
                          </select>
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/assign-ticket/${ticket.id.replace(
                                  "#",
                                  ""
                                )}`,
                                { state: { ticket } }
                              )
                            }
                            className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100"
                          >
                            Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      No tickets available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <AdminRaiseTicketModal
            onClose={() => setShowModal(false)}
            onSubmit={handleNewTicketSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AdminTickets;
