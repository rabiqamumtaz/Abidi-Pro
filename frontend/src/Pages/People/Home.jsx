import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import FeedsCard from "../../Components/home/FeedsCard";
import AttendanceCard from "../../Components/home/AttendanceCard";
import HolidaysCard from "../../Components/home/HolidaysCard";
import ToDoCard from "../../Components/home/TodoCard";
import NotesCard from "../../Components/home/NotesCard";
import AddCardMenu from "../../Components/home/AddCardMenu";
import RecentActivitiesCard from "../../Components/home/RecentActivitiesCard";
import UpcomingBirthdaysCard from "../../Components/home/UpcomingBirthdaysCard";
import LeaveLogCard from "../../Components/home/LeaveLogCard";
import UpcomingDeadlinesCard from "../../Components/home/UpcomingDeadlinesCard";
import TimeoffBalanceCard from "../../Components/home/TimeoffBalanceCard";
import TasksAssignedToMeCard from "../../Components/home/TasksAssignedToMeCard";
import { useTimeLog } from "./TimeLogContext";

function format(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return { h, m, s };
}
const Home = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    period: "AM",
  });
  const [cards, setCards] = useState([]);

  const { elapsed } = useTimeLog();
  console.log(elapsed, "timer.com");
  const { h, m, s } = format(elapsed);

  const addCard = (type) => {
    if (!cards.find((c) => c.type === type)) {
      setCards([...cards, { type, id: Date.now() }]);
    }
  };

  const removeCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const renderCard = (card) => {
    const props = { key: card.id, onDelete: () => removeCard(card.id) };
    switch (card.type) {
      case "feeds":
        return <FeedsCard {...props} />;
      case "attendance": {
        const sampleData = [
          { day: "Mon", hours: 6 },
          { day: "Tue", hours: 8 },
          { day: "Wed", hours: 4 },
          { day: "Thu", hours: 2 },
          { day: "Fri", hours: 7 },
          { day: "Sat", hours: 0 },
          { day: "Sun", hours: 5 },
        ];
        return (
          <AttendanceCard weeklyData={sampleData} onDelete={props.onDelete} />
        );
      }
      case "holidays":
        return <HolidaysCard {...props} />;
      case "todo":
        return <ToDoCard {...props} />;
      case "notes":
        return <NotesCard {...props} />;
      case "recent activities":
        return <RecentActivitiesCard {...props} />;
      case "birthdays":
        return <UpcomingBirthdaysCard {...props} />;
      case "leavelog":
        return <LeaveLogCard {...props} />;
      case "upcomingDeadlines":
        return <UpcomingDeadlinesCard />;
      case "timeoffBalance":
        return <TimeoffBalanceCard />;
      case "tasksAssignedToMe":
        return <TasksAssignedToMeCard />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;
      setTime({ hours: hours.toString().padStart(2, "0"), minutes, period });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative flex flex-col bg-clip-border rounded-xl text-gray-700 overflow-hidden bg-primary p-5 border m-4 shadow-sm min-h-[700px] border-none">
      <CardBody className="bg-background rounded-lg border-0 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 md:p-6">
        {/* Greeting */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm sm:text-base md:text-xl font-bold">
            P
          </div>
          <div className="truncate">
            <h2 className="text-lg sm:text-xl text-heading font-semibold truncate">
              Hey, Paul!
            </h2>
            <p className="text-description text-sm">Have a great day</p>
          </div>
        </div>

        {/* Clock */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1.5 sm:py-2 rounded font-semibold text-base sm:text-lg">
              {h}
            </div>
            <div className="text-base sm:text-lg font-bold">:</div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1.5 sm:py-2 rounded font-semibold text-base sm:text-lg">
              {m}
            </div>
            <div className="text-base sm:text-lg font-bold">:</div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1.5 sm:py-2 rounded font-semibold text-base sm:text-lg">
              {s}
            </div>
          </div>
        </div>
      </CardBody>

      {/* Menu */}
      <div className="mt-4 text-end">
        <AddCardMenu onAdd={addCard} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {cards.map(renderCard)}
      </div>
    </Card>
  );
};

export default Home;
