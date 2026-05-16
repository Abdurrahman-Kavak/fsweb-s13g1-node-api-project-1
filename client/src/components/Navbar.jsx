export default function Navbar({ userName, userRole, handleLogout }) {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 shadow-xl z-20 flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4 relative overflow-hidden border-b border-indigo-950">
      {/* Dekoratif Arka Plan Şekilleri */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-1/3 bottom-[-30px] w-48 h-48 bg-white opacity-[0.03] rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute right-10 top-[-20px] w-20 h-20 bg-indigo-400 opacity-20 rounded-full blur-xl pointer-events-none"></div>

      <div className="flex items-center gap-3 sm:gap-5 z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20">
          <svg
            className="w-7 h-7 text-indigo-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            ></path>
          </svg>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-wider drop-shadow-md">
            YÖNETİM
            <span className="text-indigo-300 font-light hidden sm:inline">
              PANELİ
            </span>
          </h1>
          <p className="hidden sm:block text-indigo-200/80 text-[11px] font-bold tracking-[0.2em] uppercase mt-0.5">
            Sistem Kontrol Merkezi
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 z-10">
        <div className="hidden sm:block text-right">
          <div className="text-sm font-extrabold text-white drop-shadow-sm">
            {userName || "Kullanıcı"}
          </div>
          <div className="text-[11px] text-indigo-300 uppercase tracking-widest font-bold mt-0.5">
            {userRole === "admin" ? "Sistem Yöneticisi" : "Kullanıcı"}
          </div>
        </div>
        <div className="hidden sm:block h-10 w-px bg-white/10"></div>
        <button
          onClick={handleLogout}
          className="text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 py-2 sm:py-2.5 px-3 sm:px-5 rounded-xl shadow-lg transition-all duration-300 cursor-pointer font-bold backdrop-blur-sm flex items-center gap-2 group"
        >
          <span className="hidden sm:inline">Çıkış Yap</span>
          <span className="sm:hidden">Çıkış</span>
          <svg
            className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
