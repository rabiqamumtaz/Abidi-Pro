import { useState } from "react";
import { toast } from "react-toastify";

import FolderGrid from "./FolderGrid";
import OpenFolderScreen from "./OpenFolderScreen";
import { FiUpload } from "react-icons/fi";
import { Drawer, TextField } from "@mui/material";

const UploadDocument = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [folders, setFolders] = useState([]);
  const [openedFolder, setOpenedFolder] = useState(null);

  const [folderName, setFolderName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = (open) => () => setDrawerOpen(open);

  const handleAddFolder = (newFolder) => {
    setFolders((prev) => [...prev, newFolder]);
  };

  const handleSubmit = () => {
    if (!folderName.trim()) {
      toast.error("Folder name is required");
      return;
    }

    
    handleAddFolder({
      name: folderName,
      file: "", 
      createdAt: new Date().toISOString(),
    });

    setFolderName("");
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer anchor="right" open={drawerOpen} onClose={toggle(false)}>
        <div className="w-full sm:w-80 md:w-96 h-full bg-white p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Create Folder</h2>

          <TextField
            label="Folder Name"
            variant="outlined"
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            size="small"
          />

          <button
            onClick={handleSubmit}
            className="mt-2 bg-[#497a71] text-white text-sm py-2 rounded-md hover:bg-[#99c7be] hover:text-black"
          >
            Create Folder
          </button>
        </div>
      </Drawer>

      {openedFolder ? (
        <OpenFolderScreen
          folder={openedFolder}
          onClose={() => setOpenedFolder(null)}
        />
      ) : (
        <div className="min-h-screen bg-primary p-2 sm:p-4 mx-2 my-4 sm:m-6 rounded-lg shadow-md">
          {/* Controls Section */}
          <div className="flex flex-col mb-5 bg-white rounded-lg px-4 py-4 sm:px-8">
            {/* Search controls - responsive layout */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-0">
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

              {/* Add an Upload button to open the modal */}
              <div className="mt-3 sm:mt-0">
                <button
                  onClick={toggle(true)}
                  className="flex items-center gap-2 bg-[#497a71] text-white text-sm px-4 py-2 rounded-md hover:bg-[#99c7be] hover:text-black"
                >
                  <FiUpload /> Upload Document
                </button>
              </div>
            </div>
          </div>

          {/* Uncommented this section to show the folder grid */}
          <div className="mb-4 overflow-x-auto">
            <FolderGrid
              folders={folders}
              searchTerm={searchTerm}
              onOpenFolder={setOpenedFolder}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDocument;



