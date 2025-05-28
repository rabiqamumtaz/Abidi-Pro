import { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Mail,
  Briefcase,
  Phone,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../axios"; 
 
export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/check-session", {
          withCredentials: true,
          _silentRefresh: true,
        });
        console.log("User data:", res.data.user);
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to load user profile", err);
      } finally {
        setLoading(false);
      }
    };
 
    fetchUser();
  }, []);
 
  if (loading) {
    return (
      <div className="text-white text-center mt-10">Loading profile...</div>
    );
  }
 
  if (!user) {
    return (
      <div className="text-red-500 text-center mt-10">
        No user data available.
      </div>
    );
  }
 
  const profileCards = [
    {
      icon: MapPin,
      label: "Location",
      value: user.branch || "N/A",
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Briefcase,
      label: "Department",
      value: user.department || "N/A",
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Clock,
      label: "Time Zone",
      value: user.timeZone || "N/A",
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Mail,
      label: "Email ID",
      value: user.email,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Briefcase,
      label: "Shift",
      value: user.empType || "N/A",
      bg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: Phone,
      label: "Work phone",
      value: user.phoneNumber || "N/A",
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];
 
  return (
    <div className="overflow-hidden bg-primary p-5 border m-4 shadow-sm min-h-[700px] border-none rounded-lg">
      {/* Banner & Edit Button */}
      <div className="relative h-24 rounded-lg overflow-hidden shadow-md mb-10">
        <img
          src={`https://picsum.photos/1200/200?random=${user._id}`}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate("/people/edit-profile")}
          className="absolute top-3 right-4 bg-white/30 backdrop-blur-lg text-text font-medium px-4 py-1.5 rounded-md shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105 text-sm ring-1 ring-white/20"
        >
          Edit Profile
        </button>
      </div>
 
      {/* Profile Picture */}
      <div className="relative -mt-14 pl-6 z-10">
        <img
          src={`https://randomuser.me/api/portraits/lego/${
            user?._id ? user._id.length % 10 : 1
          }.jpg`}
          alt={user?.name || "User"}
          className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
        />
      </div>
 
      {/* Info Summary */}
      <div className="card bg-secondary shadow rounded-md py-4 pr-4 pl-6 mt-4 flex flex-wrap justify-between gap-2 sm:gap-4">
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-text truncate sm:max-w-[250px]">
            {user.empID || "ID"} - {user.name}
          </p>
          <p className="text-text truncate">{user.designation || user.role}</p>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-text">Reporting to</p>
          <p className="font-medium text-text text-opacity-80 break-words">
            {user.reportsTo || "—"}
          </p>
        </div>
      </div>
 
      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 card">
        {profileCards.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-2 bg-secondary rounded-md shadow-sm"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-md shadow-md ${item.bg}`}
            >
              <item.icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>
            <div>
              <div className="text-sm font-medium text-text">{item.label}</div>
              <div className="text-sm text-text">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
 
      {/* About */}
      {user.about && (
        <div className="mb-6 card bg-secondary shadow p-2 rounded-lg">
          <h3 className="font-semibold mb-2 text-heading">About</h3>
          <p className="text-sm text-text">{user.about}</p>
        </div>
      )}
 
      {/* Work & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <Briefcase className="text-purple-600 w-5 h-5" />
            <h3 className="text-lg font-semibold text-heading">
              Work Experience
            </h3>
          </div>
          <div className="text-sm text-text space-y-4">
            {user.experience && user.experience.length > 0 ? (
              user.experience.map((exp, idx) => (
                <div key={idx} className="border-b border-muted pb-2">
                  <div className="font-medium text-base text-text">
                    {exp.company}
                  </div>
                  <div className="italic text-sm text-muted">{exp.jobType}</div>
                  <div className="text-xs text-muted">
                    {new Date(exp.startDate).toLocaleDateString()} –{" "}
                    {exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : "Present"}
                  </div>
                  <div className="text-sm mt-1">{exp.description}</div>
                </div>
              ))
            ) : (
              <p className="text-muted">No work experience available.</p>
            )}
          </div>
        </div>
 
        <div className="bg-secondary p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="text-blue-600 w-5 h-5" />
            <h3 className="text-lg font-semibold text-heading">Education</h3>
          </div>
          <div className="text-sm text-text space-y-4">
            {user.education && user.education.length > 0 ? (
              user.education.map((edu, idx) => (
                <div key={idx} className="border-b border-muted pb-2">
                  <div className="font-medium text-base text-text">
                    {edu.degree}
                  </div>
                  <div>{edu.institution}</div>
                  <div className="text-xs text-muted">
                    {edu.startYear} – {edu.endYear}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No education history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
 