import React from "react";
import { FiPaperclip } from "react-icons/fi";

const ViewTicketDetailsModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const statusColor =
    ticket.status === "opened"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40  flex justify-end transition-opacity duration-300">
      <div className="bg-white w-full sm:max-w-[90%] md:max-w-[500px] h-full p-6 shadow-2xl transform transition-all duration-500 translate-x-0 rounded-tl-3xl rounded-bl-3xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-800"> Ticket Overview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 text-3xl font-light hover:text-red-500 transition"
          >
            ×
          </button>
        </div>

        {/* Ticket Details */}
        <div className="space-y-6 text-base text-gray-700">
          <DetailItem label="Ticket ID" value={ticket.id} />
          <DetailItem label="Created On" value={ticket.date} />
          <DetailItem label="Requester Email" value={ticket.email || "Not provided"} />
          <DetailItem label="Subject" value={ticket.subject} />

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Status</label>
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${statusColor}`}>
              {ticket.status}
            </span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Description</label>
            <p className="bg-gray-100 p-3 rounded-lg text-gray-800 shadow-sm leading-relaxed">
              {ticket.comment}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Attachment</label>
            {ticket.attachment ? (
              <div className="flex items-center gap-2 text-blue-600">
                <FiPaperclip className="w-4 h-4" />
                <span className="underline cursor-pointer">{ticket.attachment.name || "View File"}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-400 italic">No attachment provided</span>
            )}
          </div>
        </div>

        {/* Footer / Close */}
        <div className="mt-auto pt-6 ">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-300 text-red-800 rounded hover:bg-red-400 "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Detail block component
const DetailItem = ({ label, value }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>
    <div className="text-gray-800">{value}</div>
  </div>
);

export default ViewTicketDetailsModal;
