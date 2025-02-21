import { createContext, use, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleSetUser = (data) => {
    if (data.success) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
