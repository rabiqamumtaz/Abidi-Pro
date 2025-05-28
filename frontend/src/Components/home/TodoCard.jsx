import React, { useState, useEffect, useRef } from "react";
import {
  FiTrash2,
  FiPlus,
  FiEdit2,
  FiMoreVertical,
  FiCheckSquare,
} from "react-icons/fi";

const defaultTasks = [
  {
    id: 1,
    title: "UI Designs",
    description: "Explore the designs for UI",
    dueDate: "2024-05-15",
    completed: true,
  },
  {
    id: 2,
    title: "Build a component",
    description: "Create input field and interactions",
    dueDate: "2024-05-20",
    completed: false,
  },
];

const ToDoCard = ({ onDelete }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [editing, setEditing] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    setTasks(defaultTasks);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addTask = () => {
    if (newTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTitle.trim(),
          description: newDesc.trim(),
          dueDate: newDueDate || null,
          completed: false,
        },
      ]);
      setNewTitle("");
      setNewDesc("");
      setNewDueDate("");
      setShowAddForm(false);
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleFieldChange = (id, field, value) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleBlur = () => setEditing(null);

  return (
    <div className="relative bg-background rounded-xl shadow-md p-5 pt-10 overflow-visible w-full">
      {/* Floating Icon */}
      <div className="absolute -top-4 left-4 bg-green-200 text-green-800 w-10 h-10 flex items-center justify-center rounded-md shadow z-10">
        <FiCheckSquare className="text-lg" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl text-text font-semibold">To-Do</h2>
          <p className="text-sm text-cardDescription font-medium cursor-pointer">
            Enter Your to do list here
          </p>
        </div>

        {/* Custom Dropdown */}
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

      {/* Add Task Form */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-4 text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
        >
          <FiPlus className="h-5 w-5" />
          Add Task
        </button>
      ) : (
        <div className="flex flex-col gap-2 mb-5">
          <input
            type="text"
            placeholder="Task name"
            className="border px-3 py-2 rounded text-sm w-full"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task description"
            className="border px-3 py-2 rounded text-sm w-full"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <input
            type="date"
            className="border px-3 py-2 rounded text-sm w-full"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 py-2 rounded text-sm self-end"
          >
            Save Task
          </button>
        </div>
      )}

      {/* Task List */}
      <ul className="space-y-3 text-sm">
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ backgroundColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            className={`rounded p-4 flex flex-wrap justify-between items-start gap-4 ${
              task.completed ? "bg-completed" : "bg-primary"
            }`}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="mt-1 shrink-0"
              />
              <div className="min-w-0">
                {editing === task.id ? (
                  <>
                    <input
                      className="font-semibold bg-white px-2 py-1 rounded border w-full text-sm mb-1"
                      value={task.title}
                      onChange={(e) =>
                        handleFieldChange(task.id, "title", e.target.value)
                      }
                      onBlur={handleBlur}
                    />
                    <input
                      className="text-xs text-description bg-white px-2 py-1 rounded border w-full mb-1"
                      value={task.description}
                      onChange={(e) =>
                        handleFieldChange(task.id, "description", e.target.value)
                      }
                      onBlur={handleBlur}
                    />
                    <input
                      type="date"
                      className="text-xs text-gray-600 bg-white px-2 py-1 rounded border w-full"
                      value={task.dueDate || ""}
                      onChange={(e) =>
                        handleFieldChange(task.id, "dueDate", e.target.value)
                      }
                      onBlur={handleBlur}
                    />
                  </>
                ) : (
                  <>
                    <div
                      className={`font-semibold cursor-pointer ${
                        task.completed ? "line-through text-text" : "text-text"
                      }`}
                      onClick={() => setEditing(task.id)}
                    >
                      {task.title}
                    </div>
                    <div
                      className="text-xs text-text cursor-pointer"
                      onClick={() => setEditing(task.id)}
                    >
                      {task.description}
                    </div>
                    {task.dueDate && (
                      <div className="text-xs text-description mt-1">
                        Due: {task.dueDate}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Edit + Delete Buttons */}
            <div className="flex flex-col gap-2 items-end">
              {!task.completed && (
                <button
                  onClick={() => setEditing(task.id)}
                  className="bg-green-100 text-green-700 p-1 rounded hover:bg-green-200"
                  title="Edit"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => removeTask(task.id)}
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

export default ToDoCard;
