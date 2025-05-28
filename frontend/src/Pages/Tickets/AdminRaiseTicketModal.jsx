import React, { useState } from "react";

const AdminRaiseTicketModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    id: "",
    email: "",
    subject: "",
    comment: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      ...form,
      date: new Date().toISOString().slice(0, 10),
      status: "opened",
    };
    onSubmit(newTicket);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-stretch bg-black bg-opacity-50">
      <div className="bg-white w-full sm:max-w-[90%] md:max-w-[500px] h-full p-6 shadow-xl transform transition-transform duration-300 translate-x-0 rounded-tl-3xl rounded-bl-3xl overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Raise a Ticket</h2>
          <button
            onClick={onClose}
            className="text-black text-lg font-bold "
          >
            ×
          </button>
          
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            <span className="block font-medium">Ticket ID:</span>
            <input
              name="id"
              className="w-full border p-2 rounded"
              value={form.id}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span className="block font-medium">Email:</span>
            <input
              name="email"
              type="email"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span className="block font-medium">Subject:</span>
            <input
              name="subject"
              className="w-full border p-2 rounded"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span className="block font-medium">Description:</span>
            <textarea
              name="comment"
              className="w-full border p-2 rounded"
              value={form.comment}
              onChange={handleChange}
              rows={3}
              required
            />
          </label>

          <label>
            <span className="block font-medium">Attachment:</span>
            <input
              name="attachment"
              type="file"
              className="block w-full"
              onChange={handleChange}
            />
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#497a71] text-white hover:bg-[#99c7be] hover:text-black"
            >
              Submit
            </button>
            {/* <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-300 text-red-800 rounded hover:bg-red-400"
            >
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRaiseTicketModal;
