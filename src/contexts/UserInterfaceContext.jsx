import { createContext, useState } from "react";

export const UserInterfaceContext = createContext({
  darkmode: false,
  toggleDarkMode: () => {},
});

export const UserInterfaceProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <UserInterfaceContext.Provider
      value={{ darkmode, onToggleDarkMode: handleToggleDarkMode }}
    >
      {children}
    </UserInterfaceContext.Provider>
  );
};
