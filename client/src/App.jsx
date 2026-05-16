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
    <div className="App">
      <h1>Kullanıcı Yönetimi</h1>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="İsim"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          placeholder="Biyografi"
          value={formData.bio}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Güncelle" : "Ekle"}</button>
        {editingId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", bio: "" });
            }}
          >
            İptal
          </button>
        )}
      </form>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
            <div className="actions">
              <button onClick={() => handleEdit(user)}>Düzenle</button>
              <button
                className="delete-btn"
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
