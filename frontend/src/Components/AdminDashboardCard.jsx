import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import LogListCard from './LogsListcard';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboardCards = ({ donutData, barData }) => {
        const logs = [
  { title: "Syed Munawar Ali Tirmizi", log: "has just logged in at 3:00 pm" },
  { title: "Murtaza Mehmood", log: "has just logged in at 2:00 pm" },
  { title: "Hammad Shaikh", log: "has just logged in at 3:13 pm" },
  { title: "Syed Kausar Ali Tirmizi", log: "has just logged in at 3:00 pm" },
  { title: "Adil Abbas Khuhro", log: "has just logged in at 3:00 pm" },
];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      
      {/* Project Status - Donut Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col w-full">
        <h3 className="text-sm font-semibold mb-4">Signing Logs</h3>
        {/* <div className="p-6 flex justify-center"> */}
          <div style={{scrollbarWidth:'none',
             msOverflowStyle: 'none',
          }} className="  relative overflow-y-auto w-full h-40 sm:w-full sm:h-48 md:w-full md:h-52">
            <LogListCard data={logs} />
            {/* <Doughnut   
              data={donutData}
              options={{
                cutout: '70%',
                plugins: {
                  tooltip: { enabled: false },
                  legend: { display: false },
                }
              }}
            /> */}
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-700 font-bold text-xl">
              {donutData.datasets[0].data[0]}%
            </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* Project By Group - Bar Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col w-full">
        <h3 className="text-sm font-semibold mb-4">Project By Group</h3>
        <div className="p-4 w-full h-48">
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: { grid: { display: false }, ticks: { stepSize: 10 } }
              }
            }}
          />
        </div>
      </div>

    </div>
  )
}

export default AdminDashboardCards;
