// const HolidayTable = () => {
//         const holidays = [
//       { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
//       { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
//       { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
//     ];
//   return (
//      <div className=" space-y-px overflow-x-auto">
//       {holidays.map((holiday, index) => (
//         <div
//           key={index}
//           className={`flex w-fit sm:w-full items-center rounded-md  ${
//             index % 2 === 0 ? "bg-primary text-white" : "bg-[#B3C5C3]"
//           }`}
//         >
//           <div className="w-2/6 min-w-32 px-2 text-center py-2 truncate ">{holiday.date}</div>

//           {/* Divider */}
//           <div className="w-px  h-8 bg-white/50 mx-1"></div>

//           <div className="w-2/6 min-w-32 px-2 text-center py-2 truncate">{holiday.day}</div>

//           {/* Divider */}
//           <div className="w-px h-8 bg-white/50 mx-1"></div>

//           <div className="w-2/6 min-w-32  px-2 text-center py-2 truncate">{holiday.name}</div>
//         </div>
//       ))}
//     </div>

//   );
// };

// export default HolidayTable;


import { FiEye, FiDownload } from "react-icons/fi";

const HolidayTable = ({ searchTerm = "" }) => {
  const holidays = [
    { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
    { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
    { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
  ];

  const filtered = holidays.filter((holiday) => {
    const s = searchTerm.toLowerCase();
    return (
      holiday.name.toLowerCase().includes(s) ||
      holiday.day.toLowerCase().includes(s) ||
      holiday.date.toLowerCase().includes(s)
    );
  });

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-0">
          <thead className="bg-gray-100">
            {["Date", "Day", "Holiday Name"].map((header) => (
              <th
                key={header}
                className="p-3 font-medium text-gray-700 border-r last:border-none border-gray-300"
              >
                {header}
              </th>
            ))}
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((holiday, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{holiday.date}</td>
                  <td className="p-3">{holiday.day}</td>
                  <td className="p-3">{holiday.name}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  {searchTerm
                    ? `No holidays found matching “${searchTerm}”`
                    : "No holidays available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolidayTable;
