import { useState, useEffect } from "react";
import Login from "./Login";
import "./App.css";

const API_URL = "http://localhost:9000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const fetchUsers = async () => {
    const res = await fetch(API_URL, {
      headers: { Authorization: token },
    });
    if (res.status === 403) return handleLogout();
    const data = await res.json();
    setUsers(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.bio)
      return alert("İsim ve bio zorunludur!");

    if (editingId) {
      // Kullanıcı Güncelle (PUT) / Update User (PUT)
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(formData),
      });
      const updatedUser = await res.json();
      setUsers(users.map((u) => (u.id === editingId ? updatedUser : u)));
      setEditingId(null);
      setIsAdding(false);
    } else {
      // Kullanıcı Ekle (POST) / Add User (POST)
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(formData),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setIsAdding(false);
    }
    setFormData({ name: "", bio: "" }); // Formu temizle / Clear the form
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setUsers(users.filter((u) => u.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setFormData({ name: "", bio: "" });
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, bio: user.bio });
    setEditingId(user.id);
    setIsAdding(false);
  };

  if (!token) {
    return (
      <Login
        setToken={(t) => {
          setToken(t);
          localStorage.setItem("token", t);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="w-1/3 min-w-[320px] max-w-[400px] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-5 border-b border-gray-200 flex flex-col gap-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Kullanıcılar</h1>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-100 hover:bg-red-200 text-red-600 py-1 px-3 rounded shadow-sm transition cursor-pointer"
            >
              Çıkış Yap
            </button>
          </div>
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
              setFormData({ name: "", bio: "" });
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg shadow-sm text-sm font-semibold transition-colors cursor-pointer text-center"
          >
            + Yeni Kullanıcı Ekle
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`border p-4 rounded-xl shadow-sm transition-all cursor-pointer ${
                editingId === user.id
                  ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => handleEdit(user)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>
              <p
                className="text-gray-500 text-sm mt-1 line-clamp-2"
                title={user.bio}
              >
                {user.bio}
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(user.id);
                  }}
                  className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Hiç kullanıcı yok.
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 bg-gray-50 flex flex-col">
        {!isAdding && !editingId ? (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-4xl font-light text-gray-300">Hoşgeldiniz</h2>
          </div>
        ) : (
          <div className="flex-1 p-10 flex flex-col max-w-2xl mx-auto w-full mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
              {editingId ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  İsim
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Örn: Ahmet Yılmaz"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Biyografi
                </label>
                <textarea
                  name="bio"
                  rows="6"
                  placeholder="Kullanıcı hakkında bir şeyler yazın..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm resize-none"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md transition-colors cursor-pointer"
                >
                  {editingId ? "Değişiklikleri Kaydet" : "Kullanıcıyı Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ name: "", bio: "" });
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
