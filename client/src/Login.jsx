import { useState } from "react";
import { toast } from "react-toastify";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Giriş başarılı! Hoşgeldiniz.");
        onLogin(data.token, data.name, data.role);
      } else {
        toast.error(data.message || "Giriş başarısız.");
        setError(data.message);
      }
    } catch (err) {
      toast.error("Sunucuya bağlanılamadı.");
      setError("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Yönetici Girişi
        </h2>
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded hover:bg-indigo-700 mt-2 cursor-pointer transition-colors"
          >
            Giriş Yap
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Bilgi: admin@example.com (Tam Yetki) <br /> user@example.com (Sadece
          Okuma) <br /> Şifreler: password123
        </p>
      </div>
    </div>
  );
}
