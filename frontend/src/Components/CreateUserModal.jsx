import React, { useState } from "react";
 
const CreateUserModal = ({ isOpen, setIsOpen }) => {
  const [departments, setDepartments] = useState(["Software Development"]);
  const [locations, setLocations] = useState(["Karachi"]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
 
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    designation: "",
    department: departments[0],
    joiningDate: "",
    role: "User",
    employmentType: "Full Time",
    reportsTo: "",
    location: locations[0],
    timezone: "",
  });
 
  const employeeList = ["Murtaza Mahmood", "Munawar Tirmizi", "Adil Abbas Khuhro"];
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleDepartmentSelect = (e) => {
    const value = e.target.value;
    if (value === "__add_new__") {
      setIsAddingDepartment(true);
    } else {
      setFormData((prev) => ({ ...prev, department: value }));
    }
  };
 
  const handleLocationSelect = (e) => {
    const value = e.target.value;
    if (value === "__add_new__") {
      setIsAddingLocation(true);
    } else {
      setFormData((prev) => ({ ...prev, location: value }));
    }
  };
 
  const confirmAddDepartment = () => {
    if (newDepartment && !departments.includes(newDepartment)) {
      const updated = [...departments, newDepartment];
      setDepartments(updated);
      setFormData((prev) => ({ ...prev, department: newDepartment }));
      setNewDepartment("");
      setIsAddingDepartment(false);
    }
  };
 
  const confirmAddLocation = () => {
    if (newLocation && !locations.includes(newLocation)) {
      const updated = [...locations, newLocation];
      setLocations(updated);
      setFormData((prev) => ({ ...prev, location: newLocation }));
      setNewLocation("");
      setIsAddingLocation(false);
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Created:", formData);
    setIsOpen(false);
  };
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[9999] flex justify-end">
      <div className="w-full sm:w-[800px] bg-white h-full p-6 shadow-lg rounded-l-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create User</h2>
          <button
            className="text-gray-500 hover:text-black text-xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Employee ID, Name, Email */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
 
          {/* Row 2: Designation, Role, Employment Type */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option>Full Time</option>
                <option>Contractor</option>
                <option>Internee</option>
              </select>
            </div>
          </div>
 
          {/* Row 3: Joining Date, Reports To */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reports To</label>
              <select
                name="reportsTo"
                value={formData.reportsTo}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Manager</option>
                {employeeList.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
 
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleDepartmentSelect}
              className="w-full border rounded px-3 py-2"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
              <option value="__add_new__">+ Add New</option>
            </select>
            {isAddingDepartment && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="New Department"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="border rounded px-3 py-2 flex-1"
                />
                <button
                  type="button"
                  onClick={confirmAddDepartment}
                  className="bg-primary text-white px-3 py-2 rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingDepartment(false);
                    setNewDepartment("");
                  }}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
 
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleLocationSelect}
              className="w-full border rounded px-3 py-2"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
              <option value="__add_new__">+ Add New</option>
            </select>
            {isAddingLocation && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="New Location"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="border rounded px-3 py-2 flex-1"
                />
                <button
                  type="button"
                  onClick={confirmAddLocation}
                  className="bg-primary text-white px-3 py-2 rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingLocation(false);
                    setNewLocation("");
                  }}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
 
          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Asia/Karachi</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </div>
 
          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default CreateUserModal;
 
 