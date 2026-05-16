import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import "./App.css";

function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [userName, setUserName] = useLocalStorage("userName", null);
  const [userRole, setUserRole] = useLocalStorage("userRole", null);

  const handleLogout = () => {
    setToken(null);
    setUserName(null);
    setUserRole(null);
  };

  if (!token) {
    return (
      <Login
        onLogin={(t, name, role) => {
          setToken(t);
          setUserName(name);
          setUserRole(role);
        }}
      />
    );
  }

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
