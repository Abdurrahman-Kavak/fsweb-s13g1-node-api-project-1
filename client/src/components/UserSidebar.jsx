export default function UserSidebar({ users, selectedUser, setSelectedUser }) {
  return (
    <div className="w-1/3 min-w-[320px] max-w-[400px] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h1 className="text-2xl font-bold text-indigo-600">
          Kullanıcı Listesi
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Sistemdeki kayıtlı kullanıcıları görüntüleyin.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {users.map((user) => (
          <div
            key={user.id}
            className={`border p-4 rounded-xl shadow-sm transition-all cursor-pointer ${
              selectedUser?.id === user.id
                ? "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-300 bg-white"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {user.bio}
            </p>
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
