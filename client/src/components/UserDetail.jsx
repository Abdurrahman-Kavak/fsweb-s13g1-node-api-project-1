import ActionLogs from "./ActionLogs";

export default function UserDetail({ user, logs = [], userRole, onBack }) {
  if (!user) return null;
  return (
    <div className="flex-1 p-4 sm:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            {onBack && (
              <button
                onClick={onBack}
                className="md:hidden p-2 -ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {user.email ? "Yetkili Bilgileri" : "Kullanıcı Bilgileri"}
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Profil Kartı Arka Plan Dekoru */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-24 w-full"></div>

            <div className="px-4 sm:px-8 pb-4 sm:pb-8 flex flex-col">
              <div className="flex justify-between items-end mt-[-32px] sm:mt-[-48px] mb-4 sm:mb-6">
                <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg ml-2 sm:ml-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {user.name}
                  </h3>
                </div>
                {/* Yuvarlak Avatar */}
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=e0e7ff&color=4f46e5&size=256`
                  }
                  alt={`${user.name} Avatar`}
                  className="w-24 h-24 rounded-full bg-indigo-50 border-4 border-white shadow-md object-cover shrink-0"
                />
              </div>

              <div className="flex flex-col gap-6">
                {user.bio ? (
                  <div className="text-base font-medium text-gray-700 bg-gray-100 p-5 rounded-xl border border-gray-200 whitespace-pre-wrap break-words leading-relaxed shadow-inner">
                    {user.bio}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-5 rounded-xl border border-gray-200 shadow-inner">
                    <div>
                      <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        E-Posta Adresi
                      </span>
                      <span className="text-lg font-medium text-gray-800 break-all">
                        {user.email}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Sistem Rolü
                      </span>
                      <span
                        className={`inline-block px-4 py-1.5 text-sm font-bold rounded-full shadow-sm mt-1 ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
            İşlem Geçmişi
          </h2>
          <ActionLogs logs={logs} userRole={userRole} />
        </div>
      </div>
    </div>
  );
}
