import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:9000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(API_URL);
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
      // Kullanıcı Güncelle (PUT)
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updatedUser = await res.json();
      setUsers(users.map((u) => (u.id === editingId ? updatedUser : u)));
      setEditingId(null);
    } else {
      // Kullanıcı Ekle (POST)
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }
    setFormData({ name: "", bio: "" }); // Formu temizle
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, bio: user.bio });
    setEditingId(user.id);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 font-sans">
      <h1 className="text-center text-gray-800 text-3xl font-bold mb-8">
        Kullanıcı Yönetimi
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          name="name"
          placeholder="İsim"
          value={formData.name}
          onChange={handleChange}
          className="flex-1 p-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="text"
          name="bio"
          placeholder="Biyografi"
          value={formData.bio}
          onChange={handleChange}
          className="flex-1 p-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors cursor-pointer"
        >
          {editingId ? "Güncelle" : "Ekle"}
        </button>
        {editingId && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors cursor-pointer"
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", bio: "" });
            }}
          >
            İptal
          </button>
        )}
      </form>

      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm"
          >
            <h3 className="mt-0 mb-1 text-xl font-semibold text-gray-800">
              {user.name}
            </h3>
            <p className="text-gray-600">{user.bio}</p>
            <div className="flex gap-2 mt-4 justify-end">
              <button
                onClick={() => handleEdit(user)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors cursor-pointer"
              >
                Düzenle
              </button>
              <button
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors cursor-pointer"
                onClick={() => handleDelete(user.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
