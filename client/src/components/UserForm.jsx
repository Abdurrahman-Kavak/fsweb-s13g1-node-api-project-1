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
  // Form alanlarındaki veriyi tutan ana state
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  // Biyografi textarea'sının yüksekliğini dinamik ayarlamak için kullanılan referans
  const textareaRef = useRef(null);

  // Seçili bir kullanıcı varsa form değerlerini doldur, yoksa formu temizle
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

  // Biyografi metni değiştikçe textarea'nın yüksekliğini otomatik ayarlayan effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [formData.bio]);

  // Inputlarda değişiklik olduğunda state'i güncelleyen ortak fonksiyon
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form gönderildiğinde (submit) çalışan fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basit validasyon: isim ve biyografi boş olamaz
    if (!formData.name || !formData.bio) {
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
              {user ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative">
              {/* Kullanıcı oluşturma/düzenleme formu */}
              <form
                id="user-form"
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                <div className="p-5 sm:p-8 flex flex-col gap-4 sm:gap-6">
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
          {/* Sadece mevcut bir kullanıcı düzenleniyorsa İşlem Geçmişi paneli gösterilir */}
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
            form="user-form"
            className="flex-1 sm:flex-none px-4 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md transition-colors cursor-pointer text-center"
          >
            {user ? "Değişiklikleri Kaydet" : "Kullanıcıyı Kaydet"}
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
                window.confirm(
                  "Bu kullanıcıyı silmek istediğinize emin misiniz?",
                )
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
