export default function UserDetail({ user }) {
  if (!user) return null;
  return (
    <div className="flex-1 p-10 flex flex-col max-w-2xl mx-auto w-full mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
        {user.email ? "Yetkili Bilgileri" : "Kullanıcı Bilgileri"}
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-6">
        <div>
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            İsim
          </span>
          <span className="text-xl font-medium text-gray-800 mt-1 block">
            {user.name}
          </span>
        </div>
        {user.bio ? (
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              Biyografi
            </span>
            <span className="text-lg font-medium text-gray-800 mt-1 block">
              {user.bio}
            </span>
          </div>
        ) : (
          <>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                E-Posta Adresi
              </span>
              <span className="text-lg font-medium text-gray-800 mt-1 block">
                {user.email}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Sistem Rolü
              </span>
              <span
                className={`inline-block mt-2 px-3 py-1 text-sm font-bold rounded ${user.role === "admin" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-700"}`}
              >
                {user.role}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
