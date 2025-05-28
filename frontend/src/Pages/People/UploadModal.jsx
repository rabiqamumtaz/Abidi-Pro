import { useState } from "react";
import { Drawer, TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

const UploadModal = ({ onCreate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const toggle = (open) => () => setDrawerOpen(open);

  const handleSubmit = () => {
    if (!folderName.trim()) {
      toast.error("Folder name is required");
      return;
    }
    onCreate({
      name: folderName,
      file: "", // Add file logic later if needed
      createdAt: new Date().toISOString(),
    });
    setFolderName("");
    setDrawerOpen(false);
  };

  return (
    <>
      {/* trigger button */}
      <div className="flex justify-end">
        <button
          onClick={toggle(true)}
          className="flex items-center gap-2 bg-[#497a71] text-white text-sm px-4 py-2 rounded-md hover:bg-[#99c7be] hover:text-black"
        >
          <FiUpload /> Upload Document
        </button>
      </div>

      {/* slide‑in drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggle(false)}>
        <div className="w-80 h-full bg-white p-6 flex flex-col gap-4">
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
    </>
  );
};

export default UploadModal;
