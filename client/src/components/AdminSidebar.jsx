import { useState } from "react";

export default function AdminSidebar({
  users,
  authUsers,
  selectedUser,
  setSelectedUser,
  setIsAdding,
  setIsAddingAuth,
  handleDelete,
  handleAuthDelete,
}) {
  const [activeTab, setActiveTab] = useState("users");
  const displayUsers = activeTab === "users" ? users : authUsers;

  return (
    <div className="w-1/3 min-w-[320px] max-w-[400px] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
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
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {activeTab === "users" ? user.bio : user.email}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    activeTab === "users"
                      ? handleDelete(user.id)
                      : handleAuthDelete(user.id);
                  }}
                  className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Sil
                </button>
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
