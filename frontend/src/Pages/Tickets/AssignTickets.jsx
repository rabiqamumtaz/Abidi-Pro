"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  ChevronDown,
  Flag,
  User,
  Calendar,
  Clock,
  Paperclip,
} from "lucide-react";


const AssignTicket = () => {
  const navigate = useNavigate();
  // State for the ticket data
  const [ticket, setTicket] = useState({
    id: "155",
    title: "Check in or check out issue",
    status: "Opened",
    createdAt: "1 day ago",
    updatedAt: "1 day ago",
    description:
      "I'm having trouble checking in and out of the system. When I try to check in, I get an error message saying 'User already checked in' even though I haven't checked in today. Similarly, when I try to check out, it says 'User not checked in'.",
    priority: "Medium",
    assignee: "Alex",
    assigneeType: "App",
    createdDate: "12/01/2023",
    responses: [
      {
        id: 1,
        author: "Support Team",
        time: "1 day ago",
        content:
          "Thank you for reporting this issue. Could you please provide more details about when this started happening and if you've made any recent changes to your account?",
        avatar: "👨‍💼",
      },
      {
        id: 2,
        author: "Alex",
        time: "1 day ago",
        content:
          "It started happening yesterday after the system update. I haven't made any changes to my account",
        avatar: "👤",
      },
    ],
    activities: [
      { id: 1, type: "created", time: "1 day ago" },
      { id: 2, type: "assigned", to: "Alex", time: "1 day ago" },
      { id: 3, type: "responded", by: "Support Team", time: "1 day ago" },
    ],
    relatedTickets: [{ id: "101", title: "Login issue", status: "Opened" }],
  });

  // State for the new response
  const [newResponse, setNewResponse] = useState("");

  // Function to handle submitting a new response
  const handleSubmitResponse = () => {
    if (newResponse.trim() === "") return;

    const updatedResponses = [
      ...ticket.responses,
      {
        id: ticket.responses.length + 1,
        author: "You",
        time: "Just now",
        content: newResponse,
        avatar: "👤",
      },
    ];

    setTicket({
      ...ticket,
      responses: updatedResponses,
      activities: [
        ...ticket.activities,
        {
          id: ticket.activities.length + 1,
          type: "responded",
          by: "You",
          time: "Just now",
        },
      ],
    });

    setNewResponse("");
  };

  // Function to handle assigning the ticket
  const [assignDropdownOpen, setAssignDropdownOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const assignToUser = (user) => {
    setTicket({
      ...ticket,
      assignee: user,
      activities: [
        ...ticket.activities,
        {
          id: ticket.activities.length + 1,
          type: "assigned",
          to: user,
          time: "Just now",
        },
      ],
    });
    setAssignDropdownOpen(false);
  };

  const handleStatusChange = (status) => {
    setTicket({
      ...ticket,
      status,
      activities: [
        ...ticket.activities,
        {
          id: ticket.activities.length + 1,
          type: "statusChanged",
          to: status,
          time: "Just now",
        },
      ],
    });
    setStatusDropdownOpen(false);
  };

  // Function to handle deleting the ticket
  const handleDeleteTicket = () => {
    alert("Ticket deleted successfully!");
    // In a real app, you would redirect to a tickets list page
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="bg-primary p-6 min-h-screen rounded-2xl m-4">
        <h1 className="text-tblHead text-xl font-semibold mb-4">Tickets</h1>

        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          {/* Ticket Header */}
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
               <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/admin/admintickets")} 
        >
          <ArrowLeft size={20} />
        </button>

              <div className="flex-1">
                <h2 className="text-lg text-nowrap font-semibold flex flex-wrap items-center gap-2 text-text">
                  #{ticket.id}: {ticket.title}
                  <div className="relative">
                    <button
                      onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                      className={`
      text-xs px-2 py-1 rounded flex items-center gap-1
      transition
      ${ticket.status === "Opened" && "bg-blue-100 text-blue-700"}
      ${ticket.status === "In Progress" && "bg-yellow-100 text-yellow-700"}
      ${ticket.status === "Closed" && "bg-gray-200 text-gray-700"}
      ${ticket.status === "On Hold" && "bg-orange-100 text-orange-700"}
    `}
                    >
                      {ticket.status}
                      <ChevronDown size={14} />
                    </button>

                    {statusDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-36 bg-white border rounded shadow z-10 flex flex-col">
                        {["Opened", "In Progress", "On Hold", "Closed"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(status)}
                              className={`px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                ticket.status === status
                                  ? "bg-yellow-50 font-semibold text-yellow-700"
                                  : ""
                              }`}
                            >
                              {status}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </h2>
                <div className="text-sm text-muted flex flex-wrap items-center gap-2 text-nowrap">
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Created {ticket.createdAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Updated {ticket.updatedAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleDeleteTicket}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setAssignDropdownOpen(!assignDropdownOpen)}
                    className={`px-3 py-2 shadow-md rounded flex items-center gap-2 transition-colors
      ${
        selectedAssignee
          ? "bg-green-500 text-white"
          : "bg-primary hover:bg-primary/65 text-text"
      }
    `}
                  >
                    <span>
                      {selectedAssignee
                        ? `Assigned to: ${selectedAssignee}`
                        : "Assign"}
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {assignDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border">
                      <form className="py-2 px-2 space-y-1">
                        {["Alex", "Sarah", "John"].map((user) => (
                          <label
                            key={user}
                            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox text-teal-600"
                              checked={selectedAssignee === user}
                              onChange={() => setSelectedAssignee(user)}
                            />
                            <span className="text-sm text-gray-800">
                              {user}
                            </span>
                          </label>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            assignToUser(selectedAssignee);
                          }}
                          className={`w-full mt-2 py-1 rounded text-sm ${
                            selectedAssignee
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={!selectedAssignee}
                        >
                          Confirm
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 p-4">
              {/* Ticket Description */}
              <div className="mb-6">
                <div className="shadow-lg rounded-md p-4 bg-secondary">
                  <h3 className="text-sm font-medium text-text border-b-2 mb-2">
                    Ticket Description
                  </h3>
                  <p className="text-text text-balance">{ticket.description}</p>
                </div>
              </div>

              {/* Responses */}
              <div className="mb-6">
                <div className="card rounded-md p-4 bg-secondary shadow-lg">
                  <div className="flex justify-between items-center mb-7 border-b-2 p-1">
                    <h3 className="text-sm font-medium text-text">Responses</h3>
                    <span className="text-xs text-muted">
                      {ticket.responses.length} Responses
                    </span>
                  </div>
                  <div className="space-y-4 ">
                    {ticket.responses.map((response) => (
                      <div key={response.id} className="p-1">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-lg">
                            {response.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-semibold text-heading">
                                {response.author}
                              </h4>
                              <span className="text-xs text-muted">
                                {response.time}
                              </span>
                            </div>
                            <p className="mt-1 text-text">{response.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Response */}
              <div className="card p-2 bg-secondary rounded-md shadow-xl">
                <h3 className="text-sm font-medium text-muted mb-2 border-b-2 p-2">
                  Add Response
                </h3>
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  className="w-full border rounded-md p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Add your response here..."
                ></textarea>

                <div className="flex justify-between flex-wrap gap-2 mt-3">
                  <button className="flex items-center text-gray-600 hover:text-gray-900 text-xs sm:text-sm md:text-base">
                    <Paperclip size={16} className="mr-1" />
                    Add Attachment
                  </button>

                  <button
                    onClick={handleSubmitResponse}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-xs sm:text-sm md:text-base"
                  >
                    Submit Response
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 ">
              {/* Ticket Details */}
              <div className="mb-6 card bg-secondary p-4 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Ticket Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-orange-500">
                      <Flag size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Priority</p>
                      <p className="font-medium">{ticket.priority}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-blue-500">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assignee</p>
                      <p className="font-medium">{ticket.assignee}</p>
                      <p className="text-xs text-gray-500">
                        {ticket.assigneeType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-green-500">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="font-medium">{ticket.createdDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="mb-6 card bg-secondary p-4 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Activity Log
                </h3>

                <ul className="space-y-2 text-text">
                  {ticket.activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="w-1 h-1 rounded-full text-text mt-2"></span>
                      {activity.type === "created" && (
  <span>
    Ticket created{" "}
    <span className="text-xs text-gray-500">{activity.time}</span>
  </span>
)}
{activity.type === "assigned" && (
  <span>
    Assigned to {activity.to}{" "}
    <span className="text-xs text-gray-500">{activity.time}</span>
  </span>
)}
{activity.type === "responded" && (
  <span>
    {activity.by} responded{" "}
    <span className="text-xs text-gray-500">{activity.time}</span>
  </span>
)}
{activity.type === "statusChanged" && (
  <span>
    Status changed to{" "}
    <span className="font-semibold">{activity.to}</span>{" "}
    <span className="text-xs text-gray-500">{activity.time}</span>
  </span>
)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Tickets */}
              <div className="card bg-secondary p-4 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Related Tickets
                </h3>

                <ul className="space-y-2">
                  {ticket.relatedTickets.map((relatedTicket) => (
                    <li
                      key={relatedTicket.id}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2"></span>
                      <span>
                        {relatedTicket.title}
                        <div className="text-xs text-gray-500">
                          #{relatedTicket.id} - {relatedTicket.status}
                        </div>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTicket;
