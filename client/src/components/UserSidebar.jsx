export default function UserSidebar({ users, selectedUser, setSelectedUser }) {
  return (
    <div className="w-1/3 min-w-[320px] max-w-[400px] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      {/* Admin sekmesi ile aynı görsel bütünlükte sade başlık */}
      <div className="w-full py-4 text-sm font-bold text-center bg-gray-50 text-indigo-600 border-t-2 border-t-indigo-600 border-b border-gray-200">
        Kullanıcılar
      </div>
      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=f3f4f6&color=374151`
                  }
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.bio}</p>
                </div>
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
    </div>
  );
}
