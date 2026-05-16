import { useState, useEffect, useRef } from "react";
import ActionLogs from "./ActionLogs";

export default function UserForm({
  user,
  onSubmit,
  onCancel,
  logs = [],
  onDelete,
  userRole,
}) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bio: user.bio,
        avatar: user.avatar || "",
      });
    } else {
      setFormData({ name: "", bio: "", avatar: "" });
    }
  }, [user]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [formData.bio]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.bio) {
      return alert("Tüm alanları doldurmak zorunludur!");
    }
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col min-h-full w-full relative">
      <div className="flex-1 p-8 w-full max-w-7xl mx-auto">
        <div
          className={`flex flex-col gap-8 items-start ${user ? "lg:flex-row" : ""}`}
        >
          <div className={user ? "flex-1 w-full" : "max-w-2xl mx-auto w-full"}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
              {user ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative">
              <form
                id="user-form"
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                <div className="p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      İsim
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="Kullanıcı İsmi"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Biyografi
                    </label>
                    <textarea
                      ref={textareaRef}
                      name="bio"
                      rows="2"
                      value={formData.bio}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm resize-none bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors overflow-hidden"
                      placeholder="Kullanıcı hakkında bir şeyler yazın..."
                      required
                    />
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
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                İşlem Geçmişi
              </h2>
              <ActionLogs logs={logs} userRole={userRole} />
            </div>
          )}
        </div>
      </div>

      {/* Main Context Genişliğinde Sabit Alt Buton Bloğu */}
      <div className="sticky bottom-0 w-full bg-gray-50 border-t border-gray-200 border-b-2 border-b-indigo-600 py-[15px] px-8 flex items-center justify-between z-50">
        <div className="flex gap-4">
          <button
            type="submit"
            form="user-form"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md transition-colors cursor-pointer"
          >
            {user ? "Değişiklikleri Kaydet" : "Kullanıcıyı Kaydet"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold transition-colors cursor-pointer"
          >
            İptal
          </button>
        </div>
        {user && onDelete && (
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Bu kullanıcıyı silmek istediğinize emin misiniz?",
                )
              ) {
                onDelete();
              }
            }}
            className="px-8 py-3 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded-lg font-bold shadow-sm transition-colors cursor-pointer"
          >
            Sil
          </button>
        )}
      </div>
    </div>
  );
}
