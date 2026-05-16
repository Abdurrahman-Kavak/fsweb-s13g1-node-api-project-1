import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Login({ onLogin }) {
  // LocalStorage'dan daha önce başarılı giriş yapmış e-postaları çeker
  const [savedEmails, setSavedEmails] = useState(() => {
    try {
      const item = localStorage.getItem("savedEmails");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  // Form state'leri: E-posta alanı için daha önce kaydedilmiş veri varsa onu varsayılan yapar
  const [email, setEmail] = useState(
    savedEmails.length > 0 ? savedEmails[0] : "",
  );
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Alt kısımda gösterilecek örnek kullanıcı listesi için state
  const [demoUsers, setDemoUsers] = useState([]);

  useEffect(() => {
    // Backend'deki yetkilileri çekmek için (giriş yapmadan listeleyebilmek adına test token'ı kullanıyoruz)
    fetch("http://localhost:9000/api/auth-users", {
      headers: { Authorization: "admin-token-123" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDemoUsers(data);
        }
      })
      .catch((err) => console.log("Kullanıcı bilgileri çekilemedi:", err));
  }, []);

  // E-posta inputundan odak (focus) kalktığında çalışacak validasyon (doğrulama)
  const handleEmailBlur = () => {
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Lütfen e-posta giriniz." }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Lütfen geçerli bir e-posta adresi giriniz.",
      }));
    }
  };

  // Şifre inputundan odak (focus) kalktığında çalışacak validasyon
  const handlePasswordBlur = () => {
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Lütfen şifre giriniz." }));
    }
  };

  // Form gönderildiğinde (submit) çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini durdurur

    let newErrors = { email: "", password: "" };
    let hasError = false;

    // Form gönderilmeden önce e-posta kontrolü
    if (!email.trim()) {
      newErrors.email = "Lütfen e-posta giriniz.";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
      hasError = true;
    }

    // Form gönderilmeden önce şifre kontrolü
    if (!password.trim()) {
      newErrors.password = "Lütfen şifre giriniz.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return; // Hata varsa sunucuya istek atmadan işlemi kes

    try {
      // Sunucuya giriş (login) isteği atar
      const res = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Giriş başarılı! Hoşgeldiniz.");

        // Başarılı giriş yapan e-postayı kaydet (en üste ekle, kopyaları temizle)
        const newSaved = [email, ...savedEmails.filter((e) => e !== email)];
        localStorage.setItem("savedEmails", JSON.stringify(newSaved));

        // Giriş başarılıysa App.jsx içerisindeki state'lere bilgileri iletir
        onLogin(data.token, data.name, data.role);
      } else {
        toast.error(data.message || "Giriş başarısız.");
      }
    } catch (err) {
      toast.error("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 font-sans p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl gap-6 items-start justify-center">
        {/* Sol Taraf: Giriş Formu */}
        <div className="w-full lg:w-1/2 max-w-[400px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex-shrink-0">
          {/* Premium Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-center relative overflow-hidden">
            <div className="absolute -left-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-white opacity-[0.05] rounded-full blur-xl pointer-events-none"></div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider drop-shadow-md relative z-10">
              GİRİŞ YAP
            </h2>
            <p className="text-indigo-200 text-xs font-medium mt-1 relative z-10">
              Yönetim Paneline Hoşgeldiniz
            </p>
          </div>

          <div className="p-5 sm:p-6">
            {/* Giriş Formu Başlangıcı */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="ornek@mail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  onBlur={handleEmailBlur}
                  autoFocus={savedEmails.length === 0}
                  list="saved-emails"
                  className={`p-2.5 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 shadow-sm bg-gray-50 text-gray-900 transition-all ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                  }`}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 font-semibold mt-1">
                    {errors.email}
                  </span>
                )}
                <datalist id="saved-emails">
                  {savedEmails.map((em, idx) => (
                    <option key={idx} value={em} />
                  ))}
                </datalist>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Şifrenizi giriniz"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  onBlur={handlePasswordBlur}
                  autoFocus={savedEmails.length > 0}
                  className={`p-2.5 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 shadow-sm bg-gray-50 text-gray-900 transition-all ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                  }`}
                />
                {errors.password && (
                  <span className="text-xs text-red-500 font-semibold mt-1">
                    {errors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm sm:text-base shadow-md shadow-indigo-200 transition-all cursor-pointer mt-1 sm:mt-2"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>

        {/* Sağ Taraf: Bilgilendirme Amaçlı Örnek Kullanıcılar Tablosu */}
        <div className="w-full lg:w-1/2 max-w-[480px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-5 sm:p-6 border-b border-gray-100 bg-white">
            <h3 className="text-base sm:text-lg font-black text-gray-800 text-center uppercase tracking-wide">
              Örnek Kullanıcılar
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-1 font-medium">
              Test için kullanabileceğiniz hesaplar
            </p>
          </div>
          <div className="overflow-x-auto bg-gray-50">
            <table className="w-full text-left text-xs sm:text-sm text-gray-600">
              <thead className="bg-gray-100/50 text-gray-700 uppercase font-semibold text-[10px] sm:text-xs">
                <tr>
                  <th className="px-3 py-3 sm:px-4 border-b border-gray-200">
                    Rol
                  </th>
                  <th className="px-3 py-3 sm:px-4 border-b border-gray-200">
                    E-Posta
                  </th>
                  <th className="px-3 py-3 sm:px-4 border-b border-gray-200">
                    Şifre
                  </th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.length > 0 ? (
                  demoUsers.map((u, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 last:border-0 hover:bg-white transition-colors"
                    >
                      <td className="px-3 py-3 sm:px-4 font-bold text-indigo-600 capitalize">
                        {u.role === "admin" ? "Admin" : "User"}
                      </td>
                      <td className="px-3 py-3 sm:px-4">{u.email}</td>
                      <td className="px-3 py-3 sm:px-4 font-mono text-gray-500">
                        {u.password}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-3 py-6 text-center text-gray-400 font-medium"
                    >
                      Bilgiler yükleniyor...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
