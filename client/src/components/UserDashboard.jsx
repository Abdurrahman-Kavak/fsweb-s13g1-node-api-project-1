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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(API_URL, { headers: { Authorization: token } });
    if (res.status === 403) return handleLogout();
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
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
        <div className="flex-1 bg-gray-50 flex flex-col overflow-y-auto">
          {!selectedUser ? (
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-4xl font-light text-gray-300">
                Hoşgeldiniz, {userName || "Kullanıcı"}
              </h2>
            </div>
          ) : (
            <UserDetail user={selectedUser} />
          )}
        </div>
      </div>
    </div>
  );
}
