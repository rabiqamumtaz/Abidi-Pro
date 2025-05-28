import React from 'react'
import AttendanceCard from '../../Components/AttendanceCard';
import { HiOutlineUserRemove } from 'react-icons/hi';
import { FaHospital, FaUmbrellaBeach, FaUserFriends } from 'react-icons/fa';
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import ProjectCard from '../../Components/ProjectCard';
import ProjectDashboardCards from '../../Components/ProjectDashboardCard';
import AdminDashboardCards from '../../Components/AdminDashboardCard';

const AdminDashBoard = () => {
 const donutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [80, 20],
      backgroundColor: ['#93C5FD', '#E5E7EB'],
      hoverOffset: 4,
    }],
  };

  const barData = {
    labels: ['Software', 'IT', 'Sales', 'HR'],
    datasets: [{
      data: [40, 25, 30, 20],
      backgroundColor: '#BFDBFE',
      borderRadius: 4,
      barThickness: 30,
    }],
  };
   const leaveData = [
      {
        icon: <BsFileEarmarkCheckFill color='#C8928D'  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]"/>,
        label: 'Users',
        available: 0,
        badgeColor: 'bg-[#FFC2C2]',
      },
      {
        icon: <BsFileEarmarkCheckFill color='#EDB789'  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]" />,
        label: 'Apps',
        available: 10,
        badgeColor: 'bg-[#F4D4B5]',
      },
      {
        icon: <BsFileEarmarkCheckFill color='#8AC090'  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]" />,
        label: 'Groups',
        available: 10,
        badgeColor: 'bg-[#B5F4BC]',
      },
      {
        icon: <MdPeople color='#86ABEF'  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]"/>, 
        label: 'Work Location',
        available: 0,
        badgeColor: 'bg-[#AAC8FF]',
      },
     
    ];



  return (
    // MainBody
    <div className='px-4 py-2 '>
      {/* roundercorner main Content */}
      <div className='p-8 rounded-xl bg-primary'>
      <div className='bg-white px-8 py-4 font-semibold rounded-lg mb-5'>Admin Dashboard</div>
       {/* attendance summary card view horizontal */}
        <div className='mt-12 flex flex-wrap items-start justify-start gap-6 '>
          {
            leaveData.map((item, index) => {
              return (
                <ProjectCard title={item.label} value={item.available} icon={item.icon} badgeColor={item.badgeColor} />
              )
            })
          }
        </div>
        <div>
          <AdminDashboardCards donutData={donutData} barData={barData} />
        </div>
      </div>    
    </div>
  )
}

export default AdminDashBoard

