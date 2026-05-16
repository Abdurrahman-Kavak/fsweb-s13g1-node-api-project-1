import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import "./App.css";

function App() {
  // LocalStorage üzerinden oturum bilgilerini tutan state'ler
  const [token, setToken] = useLocalStorage("token", null);
  const [userName, setUserName] = useLocalStorage("userName", null);
  const [userRole, setUserRole] = useLocalStorage("userRole", null);

  // Kullanıcı çıkış yaptığında state'leri sıfırlayan fonksiyon
  const handleLogout = () => {
    setToken(null);
    setUserName(null);
    setUserRole(null);
  };

  // Eğer token yoksa (kullanıcı giriş yapmamışsa) Login ekranını göster
  if (!token) {
    return (
      <Login
        onLogin={(t, name, role) => {
          // Başarılı girişte bilgileri state'e kaydet
          setToken(t);
          setUserName(name);
          setUserRole(role);
        }}
      />
    );
  }

  // Kullanıcı rolü 'admin' ise AdminDashboard bileşenini render et
  if (userRole === "admin") {
    return (
      <AdminDashboard
        token={token}
        userName={userName}
        userRole={userRole}
        handleLogout={handleLogout}
      />
    );
  }

  // Admin değilse standart UserDashboard bileşenini render et
  return (
    <UserDashboard
      token={token}
      userName={userName}
      userRole={userRole}
      handleLogout={handleLogout}
    />
  );
}

export default App;
