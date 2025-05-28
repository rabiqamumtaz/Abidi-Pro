// import React from "react";
// import AttendanceCard from "../../Components/AttendanceCard";
// import { HiOutlineUserRemove } from "react-icons/hi";
// import { FaHospital, FaUmbrellaBeach, FaUserFriends } from "react-icons/fa";
// import { BsFileEarmarkCheckFill } from "react-icons/bs";
// import { MdPeople } from "react-icons/md";
// import ProjectCard from "../../Components/ProjectCard";
// import ProjectDashboardCards from "../../Components/ProjectDashboardCard";

// const ProjectDashBoard = () => {
//   const donutData = {
//     labels: ["Completed", "Remaining"],
//     datasets: [
//       {
//         data: [80, 20],
//         backgroundColor: ["#93C5FD", "#E5E7EB"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const barData = {
//     labels: ["Software", "IT", "Sales", "HR"],
//     datasets: [
//       {
//         data: [40, 25, 30, 20],
//         backgroundColor: "#BFDBFE",
//         borderRadius: 4,
//         barThickness: 30,
//       },
//     ],
//   };
//   const leaveData = [
//     {
//       icon: (
//         <BsFileEarmarkCheckFill
//           color="#C8928D"
//           className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]"
//         />
//       ),
//       label: "Active Projects",
//       available: 0,
//       badgeColor: "bg-[#FFC2C2]",
//     },
//     {
//       icon: (
//         <BsFileEarmarkCheckFill
//           color="#EDB789"
//           className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]"
//         />
//       ),
//       label: "Completed Projects",
//       available: 10,
//       badgeColor: "bg-[#F4D4B5]",
//     },
//     {
//       icon: (
//         <BsFileEarmarkCheckFill
//           color="#8AC090"
//           className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]"
//         />
//       ),
//       label: "Opened Task",
//       available: 10,
//       badgeColor: "bg-[#B5F4BC]",
//     },
//     {
//       icon: (
//         <MdPeople
//           color="#86ABEF"
//           className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#C8928D]"
//         />
//       ),
//       label: "Project Group",
//       available: 0,
//       badgeColor: "bg-[#AAC8FF]",
//     },
//     // {
//     //   icon: <FaTools />,
//     //   label: 'Compensatory',
//     //   available: 0,
//     //   badgeColor: 'bg-purple-400',
//     // },
//   ];

//   return (
//     // MainBody
//     <div className="px-4 py-2 ">
//       {/* roundercorner main Content */}
//       <div className="p-8 rounded-xl bg-primary">
//         <div className="bg-white px-8 py-4 font-semibold rounded-lg">
//           Project
//         </div>
//         {/* attendance summary card view horizontal */}
//         <div className="my-8 flex flex-wrap items-start justify-start gap-6">
//           {leaveData.map((item, index) => (
//             <div key={index} className="w-full sm:w-[48%] lg:w-[23%]">
//               <ProjectCard
//                 title={item.label}
//                 value={item.available}
//                 icon={item.icon}
//                 badgeColor={item.badgeColor}
//               />
//             </div>
//           ))}
//         </div>

//         <div>
//           <ProjectDashboardCards donutData={donutData} barData={barData} />;
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDashBoard;


// import React from "react";
// import { BsFileEarmarkCheckFill } from "react-icons/bs";
// import { MdPeople } from "react-icons/md";
// import ProjectCard from "../../Components/ProjectCard";
// import ProjectDashboardCards from "../../Components/ProjectDashboardCard";

// const ProjectDashBoard = () => {
//   const donutData = {
//     labels: ["Completed", "Remaining"],
//     datasets: [
//       {
//         data: [80, 20],
//         backgroundColor: ["#93C5FD", "#E5E7EB"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const barData = {
//     labels: ["Software", "IT", "Sales", "HR"],
//     datasets: [
//       {
//         data: [40, 25, 30, 20],
//         backgroundColor: "#BFDBFE",
//         borderRadius: 4,
//         barThickness: 30,
//       },
//     ],
//   };

//   const leaveData = [
//     {
//       icon: (
//         <BsFileEarmarkCheckFill className="w-5 h-5 text-[#C8928D]" />
//       ),
//       label: "Active Projects",
//       available: 0,
//       badgeColor: "bg-[#FFC2C2]",
//     },
//     {
//       icon: (
//         <BsFileEarmarkCheckFill className="w-5 h-5 text-[#EDB789]" />
//       ),
//       label: "Completed Projects",
//       available: 10,
//       badgeColor: "bg-[#F4D4B5]",
//     },
//     {
//       icon: (
//         <BsFileEarmarkCheckFill className="w-5 h-5 text-[#8AC090]" />
//       ),
//       label: "Opened Task",
//       available: 10,
//       badgeColor: "bg-[#B5F4BC]",
//     },
//     {
//       icon: <MdPeople className="w-5 h-5 text-[#86ABEF]" />,
//       label: "Project Group",
//       available: 0,
//       badgeColor: "bg-[#AAC8FF]",
//     },
//   ];

//   return (
//     <div className="px-4 py-4 sm:px-6 lg:px-8">
//       <div className="p-6 sm:p-8 rounded-xl bg-primary space-y-6">
//         {/* Header */}
//         <div className="bg-white px-4 sm:px-6 py-3 text-lg font-semibold rounded-lg shadow">
//           Project
//         </div>

//         {/* Cards Section */}
//         <div className="flex flex-wrap gap-4 sm:gap-6">
//           {leaveData.map((item, index) => (
//             <div key={index} className="w-full sm:w-[48%] lg:w-[23%]">
//               <ProjectCard
//                 title={item.label}
//                 value={item.available}
//                 icon={item.icon}
//                 badgeColor={item.badgeColor}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Charts Section */}
//         <div className="mt-6">
//           <ProjectDashboardCards donutData={donutData} barData={barData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDashBoard;




import React from "react";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import ProjectCard from "../../Components/ProjectCard";
import ProjectDashboardCards from "../../Components/ProjectDashboardCard";

const ProjectDashBoard = () => {
  const donutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#93C5FD", "#E5E7EB"],
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ["Software", "IT", "Sales", "HR"],
    datasets: [
      {
        data: [40, 25, 30, 20],
        backgroundColor: "#BFDBFE",
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const leaveData = [
    {
      icon: (
        <BsFileEarmarkCheckFill className="w-5 h-5 text-[#C8928D]" />
      ),
      label: "Active Projects",
      available: 0,
      badgeColor: "bg-[#FFC2C2]",
    },
    {
      icon: (
        <BsFileEarmarkCheckFill className="w-5 h-5 text-[#EDB789]" />
      ),
      label: "Completed Projects",
      available: 10,
      badgeColor: "bg-[#F4D4B5]",
    },
    {
      icon: (
        <BsFileEarmarkCheckFill className="w-5 h-5 text-[#8AC090]" />
      ),
      label: "Opened Task",
      available: 10,
      badgeColor: "bg-[#B5F4BC]",
    },
    {
      icon: (
        <MdPeople className="w-5 h-5 text-[#86ABEF]" />
      ),
      label: "Project Group",
      available: 0,
      badgeColor: "bg-[#AAC8FF]",
    },
  ];

  return (
    <div className="px-4 py-2">
      <div className="p-4 sm:p-8 rounded-xl bg-primary">
        <div className="bg-white px-4 py-3 mb-4 font-semibold rounded-lg">
          Project
        </div>

        {/* Responsive Cards */}
        <div className="mt-12 flex flex-wrap gap-4 sm:gap-6">
          {leaveData.map((item, index) => (
            <div key={index} className="w-full sm:w-[48%] lg:w-[23%]">
              <ProjectCard
                title={item.label}
                value={item.available}
                icon={item.icon}
                badgeColor={item.badgeColor}
              />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-8">
          <ProjectDashboardCards donutData={donutData} barData={barData} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDashBoard;
