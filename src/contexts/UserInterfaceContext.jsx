import { createContext, useState } from "react";

export const UserInterfaceContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
  onPostPage: false,
  handleDisableCardAction: () => {},
});

export const UserInterfaceProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleToggleDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  const [onPostPage, setOnPostPage] = useState(false);

  const handleDisableCardAction = (isOnPostPage) => {
    setOnPostPage(isOnPostPage);
  };

  return (
    <UserInterfaceContext.Provider
      value={{
        darkMode,
        onToggleDarkMode: handleToggleDarkMode,
        onPostPage,
        handleDisableCardAction,
      }}
    >
      {children}
    </UserInterfaceContext.Provider>
  );
};
