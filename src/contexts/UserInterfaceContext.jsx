import { createContext, useState } from "react";

export const UserInterfaceContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const UserInterfaceProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const handleToggleDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };
  return (
    <UserInterfaceContext.Provider
      value={{ darkMode, onToggleDarkMode: handleToggleDarkMode }}
    >
      {children}
    </UserInterfaceContext.Provider>
  );
};
