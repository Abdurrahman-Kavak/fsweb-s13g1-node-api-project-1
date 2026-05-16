export default function Navbar({ userName, userRole, handleLogout }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm z-20 flex justify-between items-center px-6 py-4">
      <div className="text-2xl font-black text-indigo-600 tracking-wide">
        Yönetim Paneli
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-sm font-bold text-gray-800">
            {userName || "Kullanıcı"}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            {userRole || "Admin"}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg shadow-sm transition-colors cursor-pointer font-bold"
        >
          Çıkış Yap
        </button>
      </div>
    </header>
  );
}
