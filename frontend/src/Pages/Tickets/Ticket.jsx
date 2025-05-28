import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Menu } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import RaiseTicketModal from "../../Pages/Tickets/RaiseTicketModal";
import ViewTicketDetailsModal from "../../Pages/Tickets/ViewTicketDetailsModal";
const Ticket = () => {
  const [tickets, setTickets] = useState([
    {
      id: "#001",
      date: "2025-09-12",
      subject: "LinkedIn not active",
      status: "opened",
      comment: "Looking into it",
      email: "john.doe@example.com",
      attachment: { name: "linkedin_issue_screenshot.png" },
    },
    {
      id: "#002",
      date: "2025-07-14",
      subject: "GPT Pro access",
      status: "closed",
      comment: "Not eligible",
      email: "susan.smith@example.com",
      attachment: null,
    },
    {
      id: "#003",
      date: "2025-09-12",
      subject: "API Access",
      status: "opened",
      comment: "Pending review",
      email: "tech.team@example.com",
      attachment: { name: "api_request_doc.pdf" },
    },
  ]);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const results = tickets.filter(
      (ticket) =>
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(results);
    setCurrentPage(1);
  }, [searchTerm, tickets]);

  const indexOfLastTicket = currentPage * entriesPerPage;
  const indexOfFirstTicket = indexOfLastTicket - entriesPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  const totalPages = Math.ceil(filteredTickets.length / entriesPerPage);

  const handleDelete = (id) => {
    const newTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(newTickets);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-primary m-5 rounded-2xl min-h-[700px] p-4 md:p-6">
      <div className="text-text rounded-lg  p-4 md:p-6 min-h-[700px] ">
        {/* Header Controls */}
        <div className="flex flex-col space-y-4 mb-5 bg-white rounded-lg px-4 py-4 sm:px-8">
          {/* Top controls section - responsive layout */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
            {/* Entries dropdown and search - stacks on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3 lg:mb-0">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <label className="text-sm text-heading whitespace-nowrap">
                  Show
                </label>
                <select
                  className="text-sm px-2 py-1 text-heading bg-secondary rounded-md shadow-md"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  {[10, 25, 50, 100].map((num) => (
                    <option key={num} value={num} className="text-gray-700">
                      {num}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-heading">entries</span>
              </div>

              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-0 pl-9 pr-3 py-1.5 rounded-md shadow-md w-full sm:w-64 text-sm bg-secondary text-description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Right-side controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-md"
              >
                Raise a Ticket
              </button>

              {/* Mobile menu toggle */}
              <button
                className="sm:hidden p-2 border rounded bg-white shadow-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4 w-full mt-5">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300">
                    Ticket ID
                  </th>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300">
                    Date
                  </th>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300">
                    Subject
                  </th>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300">
                    Email
                  </th>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300">
                    Attachment
                  </th>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300">
                    Status
                  </th>
                  <th className="p-3 font-medium text-gray-700 border-r border-gray-300 hidden sm:table-cell">
                    Comment
                  </th>
                  <th className="p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTickets.length ? (
                  currentTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{ticket.id}</td>
                      <td className="p-3">{ticket.date}</td>
                      <td className="p-3">{ticket.subject}</td>
                      <td className="p-3">{ticket.email || "—"}</td>
                      <td className="p-3">
                        {ticket.attachment ? (
                          <span className="text-green-600 text-xs bg-green-100 rounded-full px-2 py-1 inline-block">
                            {ticket.attachment.name}
                          </span>
                        ) : (
                          <span className="text-gray-500 text-xs bg-gray-200 rounded-full px-2 py-1 inline-block">
                            No file
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                            ticket.status === "opened"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        {ticket.comment}
                      </td>
                      <td className="p-3 flex items-center gap-3">
                        <button
                          title="View"
                          onClick={() => setSelectedTicket(ticket)}
                          className="hover:brightness-110"
                        >
                          <FaEye className="text-lg text-[#7FABA4]" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDelete(ticket.id)}
                          className="hover:brightness-110"
                        >
                          <FiTrash2 className="text-lg text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      {searchTerm
                        ? `No tickets found matching “${searchTerm}”`
                        : "No tickets available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {/* <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div>
            Showing {filteredTickets.length > 0 ? indexOfFirstTicket + 1 : 0} to{" "}
            {Math.min(indexOfLastTicket, filteredTickets.length)} of{" "}
            {filteredTickets.length} entries
          </div>
          <div className="flex mt-2 md:mt-0">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-l ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border border-l-0 rounded-r ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-100 text-gray-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div> */}

        {/* Modals */}
        {showModal && (
          <RaiseTicketModal
            onClose={() => setShowModal(false)}
            onSubmit={(newTicket) => {
              setTickets((prev) => [...prev, newTicket]);
              setShowModal(false);
            }}
          />
        )}
        {selectedTicket && (
          <ViewTicketDetailsModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Ticket;

