export const moduleConfigs = {
  people: {
    basePath: "/people",
    subNavbarKey: "people",
    links: [
      { name: "Home", path: "/people/home" },
      { name: "Profile", path: "/people/profile" },
      {name: "FAQ", path: "/people/FAQs"},
    ],
  },
  leave: {
    basePath: "/leave",
    subNavbarKey: "leave",
    links: [
      { name: "Leave Summary", path: "/leave/summary" },
      { name: "Leave Request", path: "/leave/request" },
      { name: "Leave Management", path: "/leave/leaveTrackerAdmin" },
    ],
  },
  file: {
    basePath: "/file",
    subNavbarKey: "file",
    links: [
        { name: "Shared with me", path: "/file/shared" },
      { name: "Shared with Role", path: "/file/role" },
      {name: "Upload Document", path:"/file/upload"}
    ],
  },
  time: {
    basePath: "/time",
    subNavbarKey: "time",
    links: [
      { name: "Time Tracker", path: "/time/history" },
      { name: "Approve Timelogs", path: "/time/approve" },
    ],
  },
  tickets: {
    basePath: "/tickets",
    subNavbarKey: "tickets",
    links: [
      { name: "Raise a Ticket", path: "/tickets/raise" },
      { name: "Ticket List", path: "/tickets/ticketlist" },
    ],
  },
   project: {
    basePath: "/project",
    subNavbarKey: "project",
    links: [
      { name: "Project DashBoard", path: "/project/projectDashboard" },
      { name: "Projects", path: "/project/projects" },
      { name: "Assign Task", path: "/project/projectDetailed" },
      { name: "My Task", path: "/project/myTask" },
    ],
  },
   admin: {
    basePath: "/admin",
    subNavbarKey: "admin",
    links: [
      { name: "Admin DashBoard", path: "/admin/adminDashboard" },
      { name: "User Management", path: "/admin/userManagement" },
      { name: "Activity Logs", path: "/admin/logs" },
    ],
  },

};
