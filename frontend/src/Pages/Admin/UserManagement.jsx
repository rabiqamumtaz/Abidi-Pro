import React, { useState } from "react";
import CreateUserModal from "../../Components/CreateUserModal";
import UserManagementTable from "../../Components/UserManagementTable";
 
const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: "101",
      name: "Murtaza Mahmood",
      email: "mmehmood@abidisolutions.com",
      department: "Software Development",
      role: "Admin",
      status: "Active",
    },
    {
      id: "102",
      name: "Munawar Tirmizi",
      email: "mtirmizi@abidisolutions.com",
      department: "Marketing",
      role: "Employee",
      status: "Inactive",
    },
    {
      id: "103",
      name: "Adil Abbas Khuhro",
      email: "akhuhro@abidisolutions.com",
      department: "Software Development",
      role: "Employee",
      status: "Inactive",
    },
  ]);
 
  const [sortKey, setSortKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const handleCreateUser = () => setIsModalOpen(true);
 
  const handleSort = (e) => {
    const key = e.target.value;
    setSortKey(key);
    const sorted = [...users].sort((a, b) => a[key].localeCompare(b[key]));
    setUsers(sorted);
  };
 
  return (
    <div className='px-4 py-2 '>
      {/* roundercorner main Content */}
      <div className='p-8 rounded-xl bg-primary'>
      <div className='bg-white px-8 py-4 font-semibold rounded-lg'>User Management</div>
       {/* attendance summary card view horizontal */}
       <div className='my-6'>
           <UserManagementTable  openModal={()=>setIsModalOpen(true)} users={users} />
        </div>
    </div>
 
      {/* Modal Component */}
      <CreateUserModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
};
 
export default UserManagement;
 
 