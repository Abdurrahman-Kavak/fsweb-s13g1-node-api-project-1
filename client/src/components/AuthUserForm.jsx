import { useState } from "react";

export default function AuthUserForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

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
    <div className="flex-1 p-10 flex flex-col max-w-2xl mx-auto w-full mt-10">
      <h2 className="text-3xl font-bold text-purple-800 mb-8 pb-4 border-b border-gray-200">
        Yeni Sistem Yetkilisi Ekle
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            İsim Soyisim
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
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
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            placeholder="ornek@mail.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Şifre</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            placeholder="Şifre belirleyin"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Rol</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm cursor-pointer"
            required
          >
            <option value="user">User (Sadece Görüntüler)</option>
            <option value="admin">Admin (Tam Yetki)</option>
          </select>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-md transition-colors cursor-pointer"
          >
            Yetkiliyi Kaydet
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}
