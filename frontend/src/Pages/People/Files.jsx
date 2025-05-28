import React, { useState } from "react";
import { FaRegFolder } from "react-icons/fa6";
import { IoListOutline, IoFilterSharp } from "react-icons/io5";

import FileTable from "./FileTable";
import FolderGrid from "./FolderGrid";
import OpenFolderScreen from "./OpenFolderScreen";

const Files = () => {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [folders, setFolders] = useState([]);
  const [openedFolder, setOpenedFolder] = useState(null);

  return (
    <div className="min-h-screen bg-primary p-2 sm:p-4 mx-2 my-4 sm:m-6 rounded-lg shadow-md">
      {/* If a folder is opened, just show OpenFolderScreen */}
      {openedFolder ? (
        <OpenFolderScreen
          folder={openedFolder}
          onClose={() => setOpenedFolder(null)}
        />
      ) : (
        <>
          {/* Search and View Controls */}
          <div className="flex flex-col space-y-4 mb-5 bg-white rounded-lg px-4 py-4 sm:px-8">
            {/* Top controls section - responsive layout */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
              {/* Entries dropdown and search - stacks on mobile, inline on desktop */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3 lg:mb-0">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <label className="text-sm text-heading whitespace-nowrap">
                    Show
                  </label>
                  <select className="text-sm px-2 py-1 text-heading bg-secondary rounded-md shadow-md">
                    <option className="text-gray-700">10</option>
                    <option className="text-gray-700">25</option>
                    <option className="text-gray-700">50</option>
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

              {/* View mode controls */}
              {/* Hide this entire block on small screens */}
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded flex items-center space-x-1 ${
                    viewMode === "table"
                      ? "bg-[#99c7be] text-white"
                      : "bg-primary text-white"
                  }`}
                  title="Table view"
                >
                  <IoListOutline />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded flex items-center space-x-1 ${
                    viewMode === "grid"
                      ? "bg-[#99c7be] text-white"
                      : "bg-primary text-white"
                  }`}
                  title="Grid view"
                >
                  <FaRegFolder />
                </button>
                <button
                  className="p-2 rounded bg-primary text-white flex items-center space-x-1"
                  title="Filter"
                >
                  <IoFilterSharp />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-4 overflow-x-auto">
            {viewMode === "grid" ? (
              <FolderGrid
                folders={folders}
                searchTerm={searchTerm}
                onOpenFolder={setOpenedFolder}
              />
            ) : (
              <FileTable searchTerm={searchTerm} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Files;
