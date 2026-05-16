export default function Sidebar({
  users,
  userRole,
  selectedUser,
  setSelectedUser,
  setIsAdding,
  setIsAddingAuth,
  handleDelete,
}) {
  return (
    <div className="w-1/3 min-w-[320px] max-w-[400px] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      <div className="p-5 border-b border-gray-200 flex flex-col gap-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Kullanıcılar</h1>
        {userRole === "admin" && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsAdding(true);
                if (setIsAddingAuth) setIsAddingAuth(false);
                setSelectedUser(null);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-3 rounded-lg shadow-sm text-sm font-semibold transition-colors cursor-pointer text-center"
            >
              + Yeni Kullanıcı
            </button>
            <button
              onClick={() => {
                if (setIsAddingAuth) setIsAddingAuth(true);
                setIsAdding(false);
                setSelectedUser(null);
              }}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-2 py-3 rounded-lg shadow-sm text-sm font-semibold transition-colors cursor-pointer text-center"
            >
              + Sistem Yetkilisi
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={`border p-4 rounded-xl shadow-sm transition-all cursor-pointer ${
              selectedUser?.id === user.id
                ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
            onClick={() => {
              setSelectedUser(user);
              setIsAdding(false);
              if (setIsAddingAuth) setIsAddingAuth(false);
            }}
          >
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {user.bio}
            </p>
            <div className="flex justify-end mt-4">
              {userRole === "admin" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(user.id);
                  }}
                  className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Sil
                </button>
              )}
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Kayıtlı kullanıcı yok.
          </p>
        )}
      </div>
    </div>
  );
}
