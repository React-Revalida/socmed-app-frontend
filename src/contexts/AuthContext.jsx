import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth";

export const AuthContext = createContext({
  accessToken: "",
  handleLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const navigate = useNavigate();

  const handleLogin = async (usernameOrEmail, password) => {
    try {
      const response = await authService.login(usernameOrEmail, password);
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
