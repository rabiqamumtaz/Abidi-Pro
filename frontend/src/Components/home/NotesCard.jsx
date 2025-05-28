import React, { useState, useRef, useEffect } from "react";
import {
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiMoreVertical,
  FiEdit,
} from "react-icons/fi";

const NotesCard = ({ onDelete }) => {
  const [notes, setNotes] = useState([
    { id: 1, text: "Buy milk and snacks." },
    { id: 2, text: "Schedule 1:1 with manager." },
  ]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote.trim() }]);
      setNewNote("");
    }
  };

  const startEditing = (note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  const saveEdit = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, text: editingText } : n)));
    setEditingId(null);
    setEditingText("");
  };

  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="relative bg-background rounded-xl shadow-md p-5 pt-10 w-full">
      {/* Floating Icon (replaces emoji) */}
      <div className="absolute -top-4 left-4 bg-yellow-100 text-yellow-700 w-10 h-10 flex items-center justify-center rounded-md shadow z-10">
        <FiEdit className="text-xl" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-heading font-semibold">Notes</h2>
          <p className="text-sm text-cardDescription">
            Write and edit personal notes
          </p>
        </div>

        {/* Dropdown menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FiMoreVertical className="h-5 w-5 text-gray-600" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md z-50">
              <button
                onClick={() => {
                  onDelete();
                  setMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Delete Card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Note Input */}
      <div className="flex flex-col sm:flex-row mb-4 gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded text-sm"
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <button
          onClick={addNote}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition mt-2 sm:mt-0 sm:ml-2"
        >
          Add
        </button>
      </div>

      {/* Notes List */}
      <ul className="space-y-3 text-sm">
        {notes.map((note) => (
          <li
            key={note.id}
            style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            className="bg-primary p-3 rounded flex justify-between items-start gap-3"
          >
            <div className="flex-1">
              {editingId === note.id ? (
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editingText}
                  autoFocus
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => saveEdit(note.id)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(note.id)}
                />
              ) : (
                <p
                  className="text-text cursor-pointer"
                  onClick={() => startEditing(note)}
                >
                  {note.text}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 items-end">
              {editingId !== note.id ? (
                <button
                  onClick={() => startEditing(note)}
                  className="bg-green-100 text-green-700 p-1 rounded hover:bg-green-200"
                  title="Edit"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => saveEdit(note.id)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Save"
                >
                  <FiCheck className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => removeNote(note.id)}
                className="bg-red-100 text-red-600 p-1 rounded hover:bg-red-200"
                title="Delete"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesCard;
