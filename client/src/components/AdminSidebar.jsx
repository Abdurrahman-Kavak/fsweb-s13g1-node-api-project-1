import { useState } from "react";

export default function AdminSidebar({
  users,
  authUsers,
  selectedUser,
  setSelectedUser,
  setIsAdding,
  setIsAddingAuth,
  isAdding,
  isAddingAuth,
  handleDelete,
  handleAuthDelete,
}) {
  const [activeTab, setActiveTab] = useState("users");
  const displayUsers = activeTab === "users" ? users : authUsers;

  return (
    <div
      className={`${selectedUser || isAdding || isAddingAuth ? "hidden md:flex" : "flex"} w-full md:w-1/3 md:min-w-[320px] md:max-w-[400px] bg-white border-r border-gray-200 flex-col shadow-sm z-10`}
    >
      {/* 0'a 0 Bütünleşik Sekmeler (Tabs) */}
      <div className="flex w-full">
        <button
          onClick={() => {
            setActiveTab("users");
            setIsAdding(false);
            setIsAddingAuth(false);
            setSelectedUser(null);
          }}
          className={`flex-1 py-4 text-sm font-bold text-center transition-colors cursor-pointer ${
            activeTab === "users"
              ? "bg-gray-50 text-indigo-600 border-t-2 border-t-indigo-600 border-r border-gray-200"
              : "bg-gray-200 text-gray-500 hover:bg-gray-100 border-t-2 border-t-transparent border-r border-gray-200 border-b border-gray-200"
          }`}
        >
          Kullanıcılar
        </button>
        <button
          onClick={() => {
            setActiveTab("authUsers");
            setIsAdding(false);
            setIsAddingAuth(false);
            setSelectedUser(null);
          }}
          className={`flex-1 py-4 text-sm font-bold text-center transition-colors cursor-pointer ${
            activeTab === "authUsers"
              ? "bg-gray-50 text-indigo-600 border-t-2 border-t-indigo-600 border-l border-gray-200"
              : "bg-gray-200 text-gray-500 hover:bg-gray-100 border-t-2 border-t-transparent border-l border-gray-200 border-b border-gray-200"
          }`}
        >
          Yetkililer
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {displayUsers.map((user) => (
            <div
              key={user.id}
              className={`border p-4 rounded-xl shadow-sm transition-all cursor-pointer ${
                selectedUser?.id === user.id
                  ? "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300 bg-white"
              }`}
              onClick={() => {
                setSelectedUser(user);
                setIsAdding(false);
                setIsAddingAuth(false);
              }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=${activeTab === "users" ? "f3f4f6" : "e0e7ff"}&color=${activeTab === "users" ? "374151" : "4f46e5"}`
                  }
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {activeTab === "users" ? user.bio : user.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {displayUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Kayıtlı {activeTab === "users" ? "kullanıcı" : "yetkili"} yok.
            </p>
          )}
        </div>
        <button
          onClick={() => {
            if (activeTab === "users") {
              setIsAdding(true);
              setIsAddingAuth(false);
            } else {
              setIsAddingAuth(true);
              setIsAdding(false);
            }
            setSelectedUser(null);
          }}
          className="w-full py-[15px] text-sm font-bold text-center transition-colors cursor-pointer bg-gray-50 text-indigo-600 border-b-2 border-b-indigo-600 border-t-2 border-t-transparent hover:bg-gray-100"
        >
          {activeTab === "users"
            ? "+ Yeni Kullanıcı Ekle"
            : "+ Yeni Yetkili Ekle"}
        </button>
      </div>
    </div>
  );
}
