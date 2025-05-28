import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, TrashIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

const CardWrapper = ({ title, icon, children, onDelete }) => (
  <div className="relative bg-white rounded-xl shadow-md p-4">
    <div className="flex justify-between items-start mb-3">
      <div className="text-lg font-semibold flex items-center gap-2">
        <span className="text-xl">{icon}</span> {title}
      </div>
      <Menu>
        <MenuHandler>
          <IconButton variant="text">
            <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
          </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={onDelete} className="flex gap-2 text-red-500">
            <TrashIcon className="w-4 h-4" /> Delete
          </MenuItem>
          <MenuItem className="flex gap-2 text-yellow-600">
            <ArchiveBoxIcon className="w-4 h-4" /> Archive
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
    {children}
  </div>
);

export default CardWrapper;
