import React from "react";
import { FaSortDown, FaPlus } from "react-icons/fa";

const UserManagementTable = ({ users, openModal }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      {/* Top Bar: Sort By & New Project */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <button className="flex items-center justify-center gap-2 bg-[#86B2AA] text-white text-sm px-4 py-2 rounded-md hover:brightness-110 w-full sm:w-auto">
          Sort By <FaSortDown className="text-xs" />
        </button>

        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-[#86B2AA] text-white text-sm px-4 py-2 rounded-md hover:brightness-110 w-full sm:w-auto"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-0">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Name", "Email", "Department", "Role", "Status"].map(
                (header, index) => (
                  <th
                    key={index}
                    className={`p-3 font-medium text-gray-700 border-r last:border-none border-gray-300`}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.length > 0
              ? users.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.department}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{user.status}</td>
                  </tr>
                ))
              : [...Array(8)].map((_, index) => (
                  <tr key={index} className="border-b">
                    {[...Array(7)].map((__, colIndex) => (
                      <td key={colIndex} className="p-3">
                        <div className="h-4 bg-gray-100 rounded" />
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
