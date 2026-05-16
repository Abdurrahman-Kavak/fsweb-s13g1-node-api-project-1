import { useState, useEffect } from "react";
import Login from "./Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UserForm from "./components/UserForm";
import AuthUserForm from "./components/AuthUserForm";
import UserDetail from "./components/UserDetail";
import "./App.css";

const API_URL = "http://localhost:9000/api/users";
const AUTH_API_URL = "http://localhost:9000/api/auth-users";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingAuth, setIsAddingAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUserName(null);
    setUserRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
  };

  const fetchUsers = async () => {
    const res = await fetch(API_URL, {
      headers: { Authorization: token },
    });
    if (res.status === 403) return handleLogout();
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (formData) => {
    if (selectedUser) {
      const res = await fetch(`${API_URL}/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(formData),
      });
      const updatedUser = await res.json();
      setUsers(users.map((u) => (u.id === selectedUser.id ? updatedUser : u)));
      setSelectedUser(updatedUser);
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(formData),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setIsAdding(false);
      setSelectedUser(newUser); // Eklenen kullanıcıyı otomatik seç
    }
  };

  const handleAuthSubmit = async (formData) => {
    const res = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Sistem yetkilisi başarıyla eklendi!");
      setIsAddingAuth(false);
    } else {
      alert("Sistem yetkilisi eklenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setUsers(users.filter((u) => u.id !== id));
    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

  if (!token) {
    return (
      <Login
        onLogin={(t, name, role) => {
          setToken(t);
          setUserName(name);
          setUserRole(role);
          localStorage.setItem("token", t);
          localStorage.setItem("userName", name);
          localStorage.setItem("userRole", role);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Navbar
        userName={userName}
        userRole={userRole}
        handleLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          users={users}
          userRole={userRole}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setIsAdding={setIsAdding}
          setIsAddingAuth={setIsAddingAuth}
          handleDelete={handleDelete}
        />

        <div className="flex-1 bg-gray-50 flex flex-col overflow-y-auto">
          {!isAdding && !isAddingAuth && !selectedUser ? (
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-4xl font-light text-gray-300">
                Hoşgeldiniz, {userName || "Kullanıcı"}
              </h2>
            </div>
          ) : isAddingAuth ? (
            <AuthUserForm
              onSubmit={handleAuthSubmit}
              onCancel={() => setIsAddingAuth(false)}
            />
          ) : userRole === "admin" ? (
            <UserForm
              user={selectedUser}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsAdding(false);
                setSelectedUser(null);
              }}
            />
          ) : (
            <UserDetail user={selectedUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
