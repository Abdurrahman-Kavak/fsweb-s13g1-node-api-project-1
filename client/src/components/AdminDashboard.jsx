import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";
import UserForm from "./UserForm";
import AuthUserForm from "./AuthUserForm";

const API_URL = "http://localhost:9000/api/users";
const AUTH_API_URL = "http://localhost:9000/api/auth-users";

export default function AdminDashboard({
  token,
  userName,
  userRole,
  handleLogout,
}) {
  const [users, setUsers] = useState([]);
  const [authUsers, setAuthUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingAuth, setIsAddingAuth] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchAuthUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(API_URL, { headers: { Authorization: token } });
    if (res.status === 403) return handleLogout();
    const data = await res.json();
    setUsers(data);
  };

  const fetchAuthUsers = async () => {
    const res = await fetch(AUTH_API_URL, {
      headers: { Authorization: token },
    });
    if (res.ok) {
      const data = await res.json();
      setAuthUsers(data);
    }
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
      toast.success("Kullanıcı başarıyla güncellendi!");
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(formData),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setIsAdding(false);
      setSelectedUser(newUser);
      toast.success("Yeni kullanıcı başarıyla eklendi!");
    }
  };

  const handleAuthSubmit = async (formData) => {
    if (selectedUser && selectedUser.role) {
      const res = await fetch(`${AUTH_API_URL}/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setAuthUsers(
          authUsers.map((u) => (u.id === selectedUser.id ? updatedUser : u)),
        );
        setSelectedUser(updatedUser);
        toast.success("Sistem yetkilisi güncellendi!");
      }
    } else {
      const res = await fetch(AUTH_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newUser = await res.json();
        setAuthUsers([...authUsers, newUser]);
        setIsAddingAuth(false);
        setSelectedUser(newUser);
        toast.success("Sistem yetkilisi başarıyla eklendi!");
      } else {
        toast.error("Sistem yetkilisi eklenirken bir hata oluştu.");
      }
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setUsers(users.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
    toast.info("Kullanıcı silindi.");
  };

  const handleAuthDelete = async (id) => {
    await fetch(`${AUTH_API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setAuthUsers(authUsers.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
    toast.info("Sistem yetkilisi silindi.");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Navbar
        userName={userName}
        userRole={userRole}
        handleLogout={handleLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar
          users={users}
          authUsers={authUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setIsAdding={setIsAdding}
          setIsAddingAuth={setIsAddingAuth}
          handleDelete={handleDelete}
          handleAuthDelete={handleAuthDelete}
        />
        <div className="flex-1 bg-gray-50 flex flex-col overflow-y-auto">
          {!isAdding && !isAddingAuth && !selectedUser ? (
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-4xl font-light text-gray-300">
                Hoşgeldiniz, {userName || "Admin"}
              </h2>
            </div>
          ) : isAddingAuth || (selectedUser && selectedUser.email) ? (
            <AuthUserForm
              user={selectedUser && selectedUser.email ? selectedUser : null}
              onSubmit={handleAuthSubmit}
              onCancel={() => {
                setIsAddingAuth(false);
                setSelectedUser(null);
              }}
            />
          ) : (
            <UserForm
              user={selectedUser}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsAdding(false);
                setSelectedUser(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
