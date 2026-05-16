import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import UserSidebar from "./UserSidebar";
import UserDetail from "./UserDetail";

const API_URL = "http://localhost:9000/api/users";

export default function UserDashboard({
  token,
  userName,
  userRole,
  handleLogout,
}) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:9000/api/logs", {
      headers: { Authorization: token },
    });
    if (res.ok) setLogs(await res.json());
  };

  const fetchUsers = async () => {
    const res = await fetch(API_URL, { headers: { Authorization: token } });
    if (res.status === 403) return handleLogout();
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <Navbar
        userName={userName}
        userRole={userRole}
        handleLogout={handleLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <div
          className={`${!selectedUser ? "hidden md:flex" : "flex"} flex-1 bg-slate-100/50 flex-col overflow-y-auto w-full`}
        >
          {!selectedUser ? (
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-4xl font-light text-gray-300">
                Hoşgeldiniz, {userName || "Kullanıcı"}
              </h2>
            </div>
          ) : (
            <UserDetail
              user={selectedUser}
              logs={(Array.isArray(logs) ? logs : []).filter(
                (l) => l.entityId === selectedUser?.id,
              )}
              onBack={() => setSelectedUser(null)}
              userRole={userRole}
            />
          )}
        </div>
      </div>
    </div>
  );
}
