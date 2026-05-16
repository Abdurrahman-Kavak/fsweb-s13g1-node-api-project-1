import { useState, useEffect } from "react";
import ActionLogs from "./ActionLogs";

export default function AuthUserForm({
  user,
  onSubmit,
  onCancel,
  onDelete,
  logs = [],
  userRole,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        avatar: user.avatar || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
        avatar: "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      return alert("Tüm alanları doldurmak zorunludur!");
    }
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col min-h-full w-full relative">
      <div className="flex-1 p-4 sm:p-8 w-full max-w-7xl mx-auto">
        <div
          className={`flex flex-col gap-8 items-start ${user ? "lg:flex-row" : ""}`}
        >
          <div className={user ? "flex-1 w-full" : "max-w-2xl mx-auto w-full"}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-4 border-b border-gray-200">
              {user
                ? "Sistem Yetkilisini Düzenle"
                : "Yeni Sistem Yetkilisi Ekle"}
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative">
              <form
                id="auth-user-form"
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                <div className="p-5 sm:p-8 flex flex-col gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      İsim Soyisim
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="İsim Soyisim"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="ornek@mail.com"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Şifre
                    </label>
                    <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="Şifre belirleyin"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Rol
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm cursor-pointer bg-gray-50 text-gray-900 transition-colors"
                      required
                    >
                      <option value="user">User (Sadece Görüntüler)</option>
                      <option value="admin">Admin (Tam Yetki)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Avatar Linki (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {user && (
            <div className="flex-1 w-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-4 border-b border-gray-200">
                İşlem Geçmişi
              </h2>
              <ActionLogs logs={logs} userRole={userRole} />
            </div>
          )}
        </div>
      </div>

      {/* Main Context Genişliğinde Sabit Alt Buton Bloğu */}
      <div className="sticky bottom-0 w-full bg-gray-50 border-t border-gray-200 border-b-2 border-b-indigo-600 p-4 sm:py-[15px] sm:px-8 flex flex-col sm:flex-row items-center justify-between z-50 gap-3 sm:gap-0">
        <div className="flex w-full sm:w-auto gap-3 sm:gap-4">
          <button
            type="submit"
            form="auth-user-form"
            className="flex-1 sm:flex-none px-4 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md transition-colors cursor-pointer text-center"
          >
            Yetkiliyi Kaydet
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 sm:flex-none px-4 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold transition-colors cursor-pointer text-center"
          >
            İptal
          </button>
        </div>
        {user && onDelete && (
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm("Bu yetkiliyi silmek istediğinize emin misiniz?")
              ) {
                onDelete();
              }
            }}
            className="w-full sm:w-auto px-4 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded-lg font-bold shadow-sm transition-colors cursor-pointer text-center"
          >
            Sil
          </button>
        )}
      </div>
    </div>
  );
}
